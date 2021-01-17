const io = require("socket.io")(3000, {
  cors: {
    origin: "*",
  },
});

const users = {};

io.on("connection", (socket) => {
  socket.on("new-user", (name) => {
    console.log(`${name} just joined`), (users[socket.id] = name);
    console.log(users);
    socket.broadcast.emit("user-joined", `${name} has joined`);
  });
  socket.on("message", (message) => {
    console.log(message);
    socket.broadcast.emit(
      "send-message",
      `${message.name}: ${message.message}`
    );
  });
  socket.on("disconnect", () => {
    socket.broadcast.emit("user-disconnected", users[socket.id]);
    delete users[socket.id];
  });
});
