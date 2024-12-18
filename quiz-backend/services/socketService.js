const { Server } = require("socket.io");
const gameService = require("./gameService");

let io = null;

function initializeSocketService(server) {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ['GET', 'POST']
    },
  });

  io.on("connection", (socket) => {
    console.log("Nuevo cliente conectado:", socket.id);

    socket.on("join", (name) => {
      const playerId = gameService.addPlayer(name);
      socket.playerId = playerId; // Asignar el ID al socket
      socket.emit("assigned_id", { playerId });
      console.log(`Jugador ${name} unido con ID ${playerId}`);
    });

    socket.on("answer", (data) => {
      if (socket.playerId) {
        const { answerIndex } = data;
        gameService.submitAnswer(socket.playerId, answerIndex);
      }
    });

    socket.on("disconnect", () => {
      if (socket.playerId) {
        console.log(`Jugador con ID ${socket.playerId} desconectado`);
        gameService.removePlayer(socket.playerId);
      }
    });
  });

  return io;
}

function broadcast(message) {
  if (io) {
    io.emit("broadcast", message);
  }
}

module.exports = {
  initializeSocketService,
  broadcast,
};