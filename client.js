const socket = io("http://localhost:3000");

const messageForm = document.getElementById("send-container");
const messageContainer = document.getElementById("message-container");
const messageInput = document.getElementById("message-input");

// * taking user input

var name = prompt("What is your name?");
appendMessage("You Joined");

//  Notifying the server about the connection
socket.emit("new-user", name);

// * Submitting the form
messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  socket.emit("message", { name: name, message: message });
  messageInput.value = "";
  // appendMessage({ side: "in", message: `${message}`, name: "You" });
  appendMessage(`you: ${message}`);
});

// * Sending a message to the server
socket.on("send-message", (message) => appendMessage(message));

// * A function to append text message
function appendMessage(message) {
  const msgnode = document.createElement("div");
  msgnode.innerHTML = message;
  messageContainer.appendChild(msgnode);
}

// function appendMessage(message) {
//   console.log("123" + message);
//   const list = document.createElement("li");
//   list.className = message.side;

//   const chatbody = document.createElement("div");
//   chatbody.className = "chat-body";

//   const chatMsg = document.createElement("div");
//   chatMsg.className = "chat-message";

//   const sender = document.createElement("h5");
//   sender.innerText = message.name;
//   chatMsg.appendChild(sender);

//   const msg = document.createElement("p");
//   msg.innerText = message.message;
//   chatMsg.appendChild(msg);

//   chatbody.appendChild(chatMsg);

//   list.appendChild(chatbody);
// }

socket.on("user-joined", (info) => {
  appendMessage(info);
});

socket.on("user-disconnected", (username) => {
  appendMessage(`${username} left the chat`);
});
