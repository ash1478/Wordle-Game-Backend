const express = require('express');
const wordController = require('../controllers/wordController');
const wordRouter = express.Router();

wordRouter.get("/", wordController.index);
wordRouter.post("/set", wordController.setWords);
wordRouter.delete("/removeKey", wordController.removeKey);

module.exports =  wordRouter;