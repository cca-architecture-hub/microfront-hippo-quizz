const express = require('express');
const bodyParser = require("body-parser");
const http = require("http");
const { initializeSocketService, broadcast } = require("./services/socketService");
const gameService = require("./services/gameService");
const config = require("./config/config");
const routes = require("./routes/api");
const app = express();
const server = http.createServer(app);
const cors = require('cors');

app.use(cors({
  origin: '*', // Permite todos los orígenes
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'] // Cabeceras permitidas
}));
app.options('*', cors());
app.use(bodyParser.json());
app.use("/api", routes);

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

const io = initializeSocketService(server);

setInterval(() => {
  const question = gameService.getCurrentQuestion();
  const stats = gameService.getStats();
  const rank = gameService.getRank();

  if (question) {
    io.emit("question", question);
  }

  if (stats) {
    io.emit("stats", stats);
  }

  if (rank) {
    io.emit("rank", rank);
  }

}, config.broadcastInterval);

const PORT = process.env.PORT || config.port;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
