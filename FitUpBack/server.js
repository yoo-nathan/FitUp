const express = require('express');
const app = express();
require('dotenv').config();

const authRouter = require('./routes/authRoute');
const infoRouter = require('./routes/infoRoute');
const chatRouter = require('./routes/chatRoute');
const chatController = require('./controllers/chatController');

// chat export
// biome-ignore lint/style/useNodejsImportProtocol: <explanation>
const http = require("http")
// biome-ignore lint/style/useNodejsImportProtocol: <explanation>
const path = require("path")
const socketIO = require("socket.io")
const cors = require('cors');
const server = http.createServer(app);
const io = socketIO(server);
const pool = require('./db');

const infoRoute = require('./routes/infoRoute');
app.use('/', infoRoute);

//check
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "src")))
app.use('/users/authenticate', authRouter);
app.use('/getInfo', infoRouter);
app.use('/chat', chatRouter);
app.use(express.json()); 


// chat 
io.on("connection", (socket) => {
  socket.on("chatting", async (data) => {
    try {
      const { from_id, to_id, message } = data;

      const saveMessageQuery = `
        INSERT INTO chat_log (from_id, to_id, message) 
        VALUES (?, ?, ?);
        SELECT * FROM chat_log WHERE id = LAST_INSERT_ID();
      `;
      const [rows] = await pool.query(saveMessageQuery, [from_id, to_id, message]);

      const savedMessage = rows[1][0];

      if (!savedMessage) {
        console.error("Message not saved!");
      } else {
        console.log("Successfully saved message")
      }

      // biome-ignore lint/complexity/useLiteralKeys: <explanation>
      const easternTimeStamp = chatController.convertToEasternTime(savedMessage["timestamp"])

      io.emit("messageReceived", {
        from_id: from_id,
        to_id: to_id,
        message: message,
        timestamp: easternTimeStamp
      });

      const saveMostRecentMsg = await chatController.saveMostRecentMsg(from_id, to_id);

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



const PORT = process.env.LOCAL_PORT || 65080;

// app.listen(PORT, () => console.log(`Back Server running on port ${PORT}`));
server.listen(PORT, () => console.log(`Server running on port ${PORT}`))
