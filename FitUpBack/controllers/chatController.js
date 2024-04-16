require('dotenv').config();

const pool = require('../db');
const moment = require("moment-timezone")


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
      // id, from_id, to_id, message, timestamp
    })
  } catch (error) {
      console.error('Error fetching chat history: ' + error);
      return res.status(500).send('Error fetching chat history');
  }
}

const saveMostRecentMsg = async (user_id, partner_id) => {
  try {
    const maxIdQuery = 'SELECT MAX(id) AS last_message_id FROM chat_log WHERE from_id = ? AND to_id = ?';
    const [maxIdResult] = await pool.query(maxIdQuery, [user_id, partner_id]);
    const maxId = maxIdResult[0]['last_message_id'];
    // console.log(maxId)

    const lastMsgTimeQuery = 'SELECT timestamp FROM chat_log WHERE from_id = ? AND to_id = ? AND id = ?';
    const [lastMsgTimeResult] = await pool.query(lastMsgTimeQuery, [user_id, partner_id, maxId]);
    const lastMsgTime = lastMsgTimeResult[0]['timestamp'];
    // console.log(lastMsgTime);

    const lastMsgQuery = 'SELECT message FROM chat_log WHERE from_id = ? AND to_id = ? AND id = ?';
    const [lastMsgResult] = await pool.query(lastMsgQuery, [user_id, partner_id, maxId]);
    const lastMsg = lastMsgResult[0]['message'];
    // console.log(lastMsg);
    
    const saveMostRecentMsgQuery = `
      INSERT INTO chat_sessions (user_id, partner_id, last_message, last_message_time, unread_messages_count)
      VALUES (?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
      last_message = VALUES(last_message),
      last_message_time = VALUES(last_message_time)
    `;
    // unread_messages_count = unread_messages_count + 1;
    
    const cnt = 1; // NEED TO UPDATE
    const saveMostRecentMsg = await pool.query(saveMostRecentMsgQuery, [user_id, partner_id, lastMsg, lastMsgTime, cnt]);

    if (saveMostRecentMsg) {
      console.log("Most recent msg saved!");
      return true;
    }
  } catch (error) {
    console.error('Error saving the most recent message: ' + error);
    return false;
  }
}

const getMostRecentMsg = async (req, res) => {
  try {
    const { user_id, partner_id } = req.query;
    const query = 'SELECT last_message, last_message_time FROM chat_sessions WHERE user_id = ? AND partner_id = ?';

    const [results] = await pool.query(query, [user_id, partner_id]);
    const displayMsg = results[0]['last_message'];
    const displayTime = convertToEasternTime(results[0]['last_message_time']);
    
    return res.status(200).json({
      message: displayMsg,
      time: displayTime
    })
  } catch (error) {
    console.error('Error fetching most recent message and time: ' + error);
    return res.status(500).send('Error fetching most recent message and time');
  }
}

const getChatList = async (req, res) => {
  try {
    const { userId } = req.query;

    const searchIdQuery = 'SELECT partner_id FROM chat_sessions WHERE user_id = ?';
    const searchNameQuery = 'SELECT first_name, last_name FROM userInfo WHERE UID IN (?)';
    const searchChatQuery = 'SELECT * FROM chat_sessions WHERE user_id = ? AND partner_id IN (?)'

    const [idResults] = await pool.query(searchIdQuery, [userId]);
    const partnerID = [];
    
    idResults.forEach(element => {
      partnerID.push(element['partner_id']);
    })

    const [nameResults] = await pool.query(searchNameQuery, [partnerID]);
    const partnerName = [];

    nameResults.forEach(element => {
      partnerName.push(element['first_name'] + " " + element['last_name']);
    })

    const [chatResults] = await pool.query(searchChatQuery, [userId, partnerID]);
    // chatResults.forEach(element => {
    //   console.log(element['last_message'])
    // })
    // console.log(chatResults[0]['last_message'])

    return res.status(200).json({
      partner_id: partnerID,
      partner_name: partnerName,
      chat_result: chatResults
    })

  } catch (error) {
    console.error('Error in getting chat list: ' + error);
    return res.status(500).send('Error in getting chat list');
  }
}

module.exports = {
  convertToEasternTime,
  saveChatLog,
  getMyUID,
  getChatLog,
  saveMostRecentMsg,
  getMostRecentMsg,
  getChatList
}