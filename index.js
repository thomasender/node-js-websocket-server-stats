const express = require("express");
const path = require("path");
const { createServer } = require("http");

const WebSocket = require("ws");

const app = express();
app.use(express.static(path.join(__dirname, "/public")));

const server = createServer(app);
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  const id = setInterval(() => {
    ws.send(JSON.stringify(process.memoryUsage()), () => {
      // Ignoring Errors
    });
  }, 100);
  console.log("Started client interval");

  ws.on("close", () => {
    console.log("Stopping client interval");
    clearInterval(id);
  });
});

server.listen(8080, () => {
  console.log("Listening on http://0.0.0.0:8080");
});
