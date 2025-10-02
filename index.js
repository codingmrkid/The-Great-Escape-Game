const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(express.static("public"));

let players = {};

io.on("connection", (socket) => {
  console.log("Player connected:", socket.id);

  socket.on("joinGame", (data) => {
    players[socket.id] = { id: socket.id, name: data.name, team: data.team };
    io.emit("updatePlayers", players);
  });

  socket.on("rollDice", (team) => {
    let result;
    if (team === "red") {
      const redDice = [1, 2, 3, 4, 5, "trap"];
      result = redDice[Math.floor(Math.random() * redDice.length)];
    } else {
      const orangeDice = ["wall", 0, 2, 3, 4, 6];
      result = orangeDice[Math.floor(Math.random() * orangeDice.length)];
    }
    io.emit("diceResult", { team, result });
  });

  socket.on("disconnect", () => {
    delete players[socket.id];
    io.emit("updatePlayers", players);
  });
});

http.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
