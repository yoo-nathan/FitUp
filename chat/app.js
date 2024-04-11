const express = require("express")
const http = require("http")
const path = require("path")
const server = http.createServer(app);
const app = express();
const socketIO = require("socket.io")
const moment = require("moment")

const io = socketIO(server);
const cors = require('cors');
app.use(cors());


//Server Side
app.use(express.static(path.join(__dirname, "src")))
const PORT = 5001;

io.on("connection",(socket) => {
    socket.on("chatting", (data) =>{
        const  { name, msg } = data;
        io.emit("chatting",{
            name,
            msg,
            time: moment (new Date()).format("hh:mm a")
        })
    })
})

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
