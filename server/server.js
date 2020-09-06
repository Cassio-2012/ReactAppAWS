const Koa = require("koa");
const http = require("http");
const socket = require("socket.io");

const app = new Koa();
const server = http.createServer(app.callback());
const io = socket(server);

const SERVER_HOST = "localhost";
const SERVER_PORT = process.env.PORT || 8000;
// const SERVER_PORT = "http://serverchatjust.azurewebsites.net";

io.on("connection", (socket) => {
  console.log("[IO] Connection => Server has a new connection");
  socket.on("chat.message", (data) => {
    console.log("[SOCKET] Chat.message => ", data);
    io.emit("chat.message", data);
  });
  socket.on("disconnect", () => {
    console.log("[SOCKET] Disconnect => A connection was disconnected");
  });
});

server.listen(SERVER_PORT, () => {
  console.log(
    `[HTTP] Listen => Server is running at http://${SERVER_HOST}:${SERVER_PORT}`
  );
  console.log(`[HTTP] Listen => Press CTRL+C to stop it`);
});
