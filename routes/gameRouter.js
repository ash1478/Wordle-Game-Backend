const express = require('express');
const gameController = require('../controllers/gameController');
const gameRouter = express.Router();

gameRouter.post("/new", gameController.index);
gameRouter.post("/end", gameController.endGame);

module.exports = gameRouter;