const Koa = require("koa");
const http = require("http");
var https = require('https');
const socket = require("socket.io");
var fs = require('fs');


var options = {
  key: fs.readFileSync('/certificate_chat.key'),
  cert: fs.readFileSync('/certificate_chat.crt')
};

const app = new Koa();
const server = https.createServer(options, app.callback());
const io = socket(server);


const SERVER_PORT = process.env.PORT || 8877;

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
    `[HTTPS] Listen => Server oiii is running at port -> ${SERVER_PORT}`
  );
  console.log(`[HTTPS] Listen => Press CTRL+C to stop it`);
});