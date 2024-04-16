// "use strict"
// const socket = io();

// const nickname = document.querySelector("#nickname")
// const chatList = document.querySelector(".chatting-list")
// const chatInput = document.querySelector(".chatting-input")
// const sendButton = document.querySelector(".send-button")
// const displayContainer = document.querySelector(".display-container");

// chatInput.addEventListener("keypress", (event) => {
//     if (event.key === "Enter") {
//         send();
//         chatInput.value = "";
//     }
// });

// function send() {
//     const param = {
//         name: nickname.value,
//         msg: chatInput.value
//     };

//     socket.emit("chatting", param);

//     chatInput.value = "";
// }


// sendButton.addEventListener("click",() =>{
//     const param = {
//         name: nickname.value,
//         msg: chatInput.value

//     }
//     socket.emit("chatting", param)
// })

// socket.on("chatting", (data)=>{
//     const {name, msg, time} = data;
//     displayContainer.scrollTo(0, displayContainer.scrollHeight) /* automatic scroll down as more chat appear  */
// })

