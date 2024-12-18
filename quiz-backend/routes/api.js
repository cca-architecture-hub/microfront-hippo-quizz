const express = require("express");
const gameService = require("../services/gameService");
const { broadcast } = require("../services/socketService");
const router = express.Router();

router.post("/join", (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).send({ error: "Name is required." });
  }

  const playerId = gameService.addPlayer(name);
  res.status(200).send({ playerId, message: "Player added successfully." });
});

router.post("/answer", (req, res) => {
  const { playerId, answerIndex } = req.body;

  if (!playerId || answerIndex === undefined) {
    return res.status(400).send({ error: "PlayerId and AnswerIndex are required." });
  }

  gameService.submitAnswer(playerId, answerIndex);
  res.status(200).send({ message: "Answer submitted." });
});

router.get("/stats", (req, res) => {
  res.status(200).json(gameService.getStats());
});

router.post("/start-game", (req, res) => {
  gameService.startGame(broadcast);
  res.status(200).json({ message: "Juego iniciado" });
});

module.exports = router;
