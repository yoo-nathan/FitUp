require('dotenv').config();

const pool = require('../db');
const moment = require("moment-timezone");


const convertToEasternTime = (utcTimestamp) => {
  const easternTime = moment(utcTimestamp).tz('America/New_York').format('YYYY-MM-DD HH:mm:ss');
  return easternTime;
}

const saveChatLog = async (req, res) => {
  try {
    const {from_id, to_id, message} = req.body;

    const saveMessageQuery = 'INSERT INTO chat_log (from_id, to_id, message) VALUES (?, ?, ?)';

    const save = await pool.query(saveMessageQuery, [from_id, to_id, message]);
    if (!save) {
      return res.status(401).send("Message not saved!");
    }

    return res.status(200).json({
      message: "Successfully saved!"
    });
  } catch (error) {
    return res.status(500).send('Server error');
  }
}

const getMyUID = async (req, res) => {
  try {
    const myUID = req.userId;
    return res.status(200).json(myUID);
  } catch (error) {
    return res.status(500).send('Server error');
  }
}

const getChatLog = async (req, res) => {
  try {
    const { from_id, to_id } = req.query;

    const query = "SELECT * from chat_log WHERE (from_id = ? AND to_id = ?) OR (from_id = ? AND to_id = ?) ORDER BY timestamp ASC";

    const results = await pool.query(query, [from_id, to_id, to_id, from_id]);

    return res.status(201).json({
      results: results[0]
      // id, from_id, to_id, message, timestamp, read_status
    })
  } catch (error) {
      console.error('Error fetching chat history: ' + error);
      return res.status(500).send('Error fetching chat history');
  }
}

const saveMostRecentMsg = async (user_id, partner_id) => {
  try {
    const lastMsgQuery = `
      SELECT message, timestamp, read_status 
      FROM chat_log 
      WHERE (from_id = ? AND to_id = ?) OR (from_id = ? AND to_id = ?)
      ORDER BY id DESC 
      LIMIT 1`;
    
    const [lastMsgResult] = await pool.query(lastMsgQuery, [user_id, partner_id, partner_id, user_id]);
    
    if (lastMsgResult.length === 0) {
      console.log("No messages found between users.");
      return false;
    }

    const { message: lastMsg, timestamp: lastMsgTime, read_status: lastMsgRead } = lastMsgResult[0];
    
    const saveMostRecentMsgQuery = `
        INSERT INTO chat_sessions
        (user_id, partner_id, last_message, last_message_time, unread_messages_count)
        VALUES
        (LEAST(?, ?), GREATEST(?, ?), ?, ?, ?)
        ON DUPLICATE KEY UPDATE
        last_message = VALUES(last_message),
        last_message_time = VALUES(last_message_time),
        unread_messages_count = VALUES(unread_messages_count)
    `;

    
    const saveMostRecentMsg = await pool.query(saveMostRecentMsgQuery, [user_id, partner_id, user_id, partner_id, lastMsg, lastMsgTime, lastMsgRead]);

    const countQuery = `
      SELECT unread_messages_count
      FROM chat_sessions
      WHERE user_id = LEAST(?, ?) AND partner_id = GREATEST(?, ?)`;

    const [countResult] = await pool.query(countQuery, [user_id, partner_id, user_id, partner_id]);


    if (saveMostRecentMsg) {
      console.log("Most recent msg saved!");
      return { success: true, unreadCount: countResult[0].unread_messages_count };
    }
  } catch (error) {
    console.error('Error saving the most recent message: ' + error);
    return { success: false, unreadCount: 0 };
  }
}

const getMostRecentMsg = async (req, res) => {
  try {
    const { user_id, partner_id } = req.query;
    const query = 'SELECT last_message, last_message_time, unread_messages_count FROM chat_sessions WHERE user_id = ? AND partner_id = ?';

    const [results] = await pool.query(query, [user_id, partner_id]);
    const displayMsg = results[0]['last_message'];
    const displayTime = convertToEasternTime(results[0]['last_message_time']);
    const count = results[0]['unread_messages_count'];
    
    return res.status(200).json({
      message: displayMsg,
      time: displayTime,
      count: count
    })
  } catch (error) {
    console.error('Error fetching most recent message and time: ' + error);
    return res.status(500).send('Error fetching most recent message and time');
  }
}


const getChatList = async (req, res) => {
  try {
    const { userId } = req.query;

    const searchSessionsQuery = `
      SELECT * FROM chat_sessions 
      WHERE user_id = ? OR partner_id = ?
      ORDER BY last_message_time DESC
    `;

    const searchUserInfoQuery = `
      SELECT UID, first_name, last_name FROM userInfo 
      WHERE UID IN (?)
    `;


    const [sessionsResults] = await pool.query(searchSessionsQuery, [userId, userId]);
    const userIds = sessionsResults.map(session => session.user_id === userId ? session.partner_id : session.user_id);
    if (sessionsResults.length === 0) {
      return res.status(200).json([]);
    }

    const [userInfoResults] = await pool.query(searchUserInfoQuery, [userIds]);
    const userNames = userInfoResults.reduce((acc, user) => ({
      ...acc,
      [user.UID]: user.first_name + ' ' + user.last_name
    }), {});

    const results = sessionsResults.map(session => ({
      current_user_id: userId, 
      partner_id: session.user_id === userId ? session.partner_id : session.user_id,
      partner_name: userNames[session.user_id === userId ? session.partner_id : session.user_id],
      chat_details: session
    }));

    return res.status(200).json(results);

  } catch (error) {
    console.error('Error in getting chat list: ' + error);
    return res.status(500).send('Error in getting chat list');
  }
};



const updateReadStatus = async (req, res) => {
  try {
    const { roomId, toId } = req.body;
    const updateQuery = 'UPDATE chat_log SET read_status = 0 WHERE room_id = ? AND from_id = ? AND read_status = 1';

    await pool.query(updateQuery, [roomId, toId]);

    res.send({ success: true, message: 'Message marked as read' });
  } catch (error) {
    console.error('Error updating message status:', error);
    res.status(500).send({ success: false, message: 'Failed to update message status' });
  }
}

const countUnReadMsg = async (room_id, to_id) => {
  try {
    const searchUnReadMsg = 'SELECT COUNT(*) AS unreadCount FROM chat_log WHERE from_id = ? AND room_id = ? AND read_status = 1';

    const [result] = await pool.query(searchUnReadMsg, [room_id, to_id]);
    return result[0].unreadCount;
  } catch (error) {
    console.error('Error count unread message:', error);
    return{ success: false, message: 'Failed to count unread message' };
  }
}

const isRead = async (req, res) => {
  try {
    const {from_id, to_id} = req.query;
    const searchReadStatus = 'SELECT read_status FROM chat_log WHERE from_id = ? AND to_id = ?';
    const [result] = await pool.query(searchReadStatus, [from_id, to_id]);

    return res.status(201).json(result);
  } catch (error) {
    console.error('Error reading message status:', error);
    res.status(500).send({ success: false, message: 'Failed to read message status' });
  }
}

module.exports = {
  convertToEasternTime,
  saveChatLog,
  getMyUID,
  getChatLog,
  saveMostRecentMsg,
  getMostRecentMsg,
  getChatList,
  updateReadStatus,
  countUnReadMsg,
  isRead
}