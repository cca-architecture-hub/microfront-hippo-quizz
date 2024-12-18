const uuid = require("uuid");
const questions = require("../utils/questions");

const state = {
  players: {},
  currentQuestion: null,
  responses: {},
  roundTimer: null,
  isGameActive: false,
  stats: {
    totalQuestions: 0,
    categoryStats: {},
  },
};

function initializeCategoryStats() {
  const categories = Array.from(new Set(questions.map((q) => q.category).filter(Boolean)));
  categories.forEach((category) => {
    state.stats.categoryStats[category] = { total: 0, correct: 0 };
  });
}

initializeCategoryStats();

function addPlayer(name) {
  const playerId = uuid.v4();
  state.players[playerId] = { name, score: 0 };

  if (Object.keys(state.players).length === 1 && !state.isGameActive) {
    startGame(broadcast);
  }

  return playerId;
}

function removePlayer(playerId) {
  delete state.players[playerId];
}

function startRound(broadcast) {
  if (!state.isGameActive) return;

  state.currentQuestion = questions[Math.floor(Math.random() * questions.length)];
  state.responses = {};

  broadcast({ type: "NEW_QUESTION", question: state.currentQuestion });

  state.roundTimer = setTimeout(() => evaluateRound(broadcast), 15000); // 15 segundos
}

function submitAnswer(playerId, answerIndex) {
  if (!state.players[playerId] || state.responses[playerId] !== undefined) {
    return; // Ignora jugadores inexistentes o respuestas repetidas
  }
  state.responses[playerId] = answerIndex;
}

const getCurrentQuestion = () => {
  return state.currentQuestion;
};

function evaluateRound(broadcast) {
  if (!state.currentQuestion) return;

  const correctAnswer = state.currentQuestion.answer;

  Object.entries(state.responses).forEach(([playerId, answerIndex]) => {
    const player = state.players[playerId];
    if (!player) return;

    if (answerIndex === correctAnswer) {
      player.score += 1;

      const category = state.currentQuestion.category;
      state.stats.categoryStats[category].correct += 1;
    }
  });

  const category = state.currentQuestion.category;
  state.stats.categoryStats[category].total += 1;
  state.stats.totalQuestions += 1;

  const ranking = Object.values(state.players).sort((a, b) => b.score - a.score);
  broadcast({
    type: "ROUND_RESULTS",
    ranking,
    stats: state.stats,
    correctAnswer: correctAnswer,
    question: state.currentQuestion,
  });

  startRound(broadcast);
}

function getStats() {
  return state.stats;
}

function startGame(broadcast) {
  state.isGameActive = true;
  startRound(broadcast);
}

function stopGame() {
  state.isGameActive = false;
  clearTimeout(state.roundTimer);
}

function resetGame() {
  state.players = {};
  state.currentQuestion = null;
  state.responses = {};
  state.stats.totalQuestions = 0;

  Object.keys(state.stats.categoryStats).forEach((category) => {
    state.stats.categoryStats[category] = { total: 0, correct: 0 };
  });

  clearTimeout(state.roundTimer);
}

module.exports = {
  addPlayer,
  removePlayer,
  startGame,
  stopGame,
  startRound,
  submitAnswer,
  evaluateRound,
  getStats,
  resetGame,
  getCurrentQuestion
};
