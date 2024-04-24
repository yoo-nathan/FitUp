const express = require('express');
const app = express();
require('dotenv').config();

const authRouter = require('./routes/authRoute');
const infoRouter = require('./routes/infoRoute');
const chatRouter = require('./routes/chatRoute');
const chatController = require('./controllers/chatController');

// chat export
const http = require("http")
const path = require("path")
const socketIO = require("socket.io")
const cors = require('cors');
const server = http.createServer(app);
const io = socketIO(server, {
  // wsEngine: 'ws',
  cors: {
    origin: "wss://cs-370-420520.ue.r.appspot.com",
    methods: ["GET", "POST"],
  }
  
});
const pool = require('./db');

// const infoRoute = require('./routes/infoRoute');
// app.use('/', infoRoute);

//check
app.use(cors({
  origin: "wss://cs-370-420520.ue.r.appspot.com",
  methods: ["GET", "POST"],
  credentials: true 
}));
app.use(express.json());
app.use(express.static(path.join(__dirname, "src")))
app.use('/users/authenticate', authRouter);
app.use('/getInfo', infoRouter);
app.use('/chat', chatRouter);
<<<<<<< HEAD
// app.use(express.json()); 
=======
>>>>>>> origin/main


// chat 
io.on("connection", (socket) => {
  socket.on('joinRoom', (roomId, userId) => {
    socket.join(roomId);
    console.log(`${userId} joined room ${roomId}`);
    console.log(roomId)

    socket.to(roomId).emit('userJoined', { roomId, userId });
  });

  socket.on("chatting", async (data) => {
    try {
      const { room_id, from_id, to_id, message, read_status } = data;
      console.log('chatting')
      const saveMessageQuery = `
        INSERT INTO chat_log (room_id, from_id, to_id, message) 
        VALUES (?, ?, ?, ?);
        SELECT * FROM chat_log WHERE id = LAST_INSERT_ID();
      `;
      const [rows] = await pool.query(saveMessageQuery, [room_id, from_id, to_id, message]);

      const savedMessage = rows[1][0];


      if (!savedMessage) {
        console.error("Message not saved!");
      } else {
        console.log("Successfully saved message")
      }

      const easternTimeStamp = chatController.convertToEasternTime(savedMessage["timestamp"])

      const unreadCount = await chatController.countUnReadMsg(to_id, from_id);

      io.emit("messageReceived", {
        room_id: room_id,
        from_id: from_id,
        to_id: to_id,
        message: message,
        timestamp: easternTimeStamp,
        read_status: read_status,
        unread_count: unreadCount
      });

      const saveMostRecentMsg = await chatController.saveMostRecentMsg(from_id, to_id);

      io.emit('updateUnreadCount', {toId: to_id, fromId: from_id, unreadCount: unreadCount});

      if (!saveMostRecentMsg) {
        console.error("Most Recent Message not saved!");
      } else {
        console.log("Successfully saved most recent message")
      }
    } catch (error) {
      console.error("Server error:", error);
      socket.emit("error", { message: "Server error occurred." });
    }
  });
});


const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`))