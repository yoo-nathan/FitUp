const express = require("express")
const http = require("http")
const app = express();
const path = require("path")
const server = http.createServer(app);
const socketIO = require("socket.io")

const io = socketIO(server);


//Server Side


app.use(express.static(path.join(__dirname, "src")))
const PORT = process.env.Port || 5001;


io.on("connection",(socket) => {
    socket.on("chatting", (data) =>{
        io.emit("chatting",data)
    })
})

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
