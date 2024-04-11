const express = require('express');
const app = express();
require('dotenv').config();

const authRouter = require('./routes/authRoute');
const infoRouter = require('./routes/infoRoute');

// chat export
const http = require("http")
const path = require("path")
const socketIO = require("socket.io")
const moment = require("moment")
const cors = require('cors');
const server = http.createServer(app);
const io = socketIO(server);

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "src")))
app.use('/users/authenticate', authRouter);
app.use('/getInfo', infoRouter);

// chat 
io.on("connection",(socket) => {
  socket.on("chatting", (data) => {
      const  { name, msg } = data;
      io.emit("chatting", {
          name,
          msg,
          time: moment(new Date()).format("hh:mm a")
      })
  })
})

const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => console.log(`Back Server running on port ${PORT}`));
server.listen(PORT, () => console.log(`Server running on port ${PORT}`))
