const socket = io();
let playerName, playerTeam;

document.getElementById("joinBtn").onclick = () => {
  playerName = document.getElementById("name").value;
  playerTeam = document.getElementById("team").value;
  socket.emit("joinGame", { name: playerName, team: playerTeam });
  document.getElementById("login").style.display = "none";
  document.getElementById("game").style.display = "block";
};

document.getElementById("rollBtn").onclick = () => {
  socket.emit("rollDice", playerTeam);
};

document.getElementById("sendChat").onclick = () => {
  const msg = document.getElementById("chatInput").value;
  socket.emit("chat", msg);
  document.getElementById("chatInput").value = "";
};

socket.on("diceResult", (data) => {
  alert(`${data.team} rolled: ${data.result}`);
});

socket.on("chat", (data) => {
  let log = document.getElementById("chatLog");
  log.innerHTML += `<p><b>${data.player}:</b> ${data.msg}</p>`;
});
