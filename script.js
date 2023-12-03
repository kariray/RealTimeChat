const socket = io("http://localhost:3000");
const messageContainer = document.getElementById("message-container");
const messageForm = document.getElementById("send-container");
const messageInput = document.getElementById("message-input");

const username = prompt("what is your name?");
appendMessage("You joined", "user-connection");
socket.emit("new-user", username);

socket.on("chat-message", (data) => {
  appendMessage(`${data.message}`, "message another-message");
});

socket.on("user-connected", (name) => {
  appendMessage(`${name} connected`, "user-connection");
});
socket.on("user-disconnected", (name) => {
  appendMessage(`${name} disconnected`, "user-disconnection");
});

messageForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const message = messageInput.value;
  appendMessage(`${message}`, "message my-message");
  socket.emit("send-chat-message", message);
  messageInput.value = "";
});

function appendMessage(message, className) {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageElement.setAttribute("class", className);
  messageContainer.append(messageElement);
  if (className.includes("another-message")) {
    const userElement = document.createElement("span");
    userElement.innerText = message;
    userElement.setAttribute("class", "user-name");
    messageElement.append(userElement);
  }
}
