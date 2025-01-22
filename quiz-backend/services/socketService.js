const { Server } = require("socket.io");
const gameService = require("./gameService");

let io = null;

function initializeSocketService(server) {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ['GET', 'POST']
    },
    transports: ['websocket', 'polling'],
    allowEIO3: true,
    pingTimeout: 60000,
    pingInterval: 25000
  });

  io.on("connection", (socket) => {
    console.log("Nuevo cliente conectado:", socket.id);

    socket.on("join", (name) => {
      const id = gameService.addPlayer(name);
      socket.id = id; // Asignar el ID al socket
      socket.emit("assigned_id", { id });
      console.log(`Jugador ${name} unido con ID ${id}`);
    });

    socket.on("answer", (data) => {
      if (socket.id) {
        const { answerIndex } = data;
        gameService.submitAnswer(socket.id, answerIndex);
      }
    });

    socket.on("disconnect", () => {
      if (socket.id) {
        console.log(`Jugador con ID ${socket.id} desconectado`);
        gameService.removePlayer(socket.id);
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