const express = require('express');
const authRouter = express.Router();
const authController = require('../controllers/authController');

authRouter.get("/", (req, res) => {
    res.send("You have reached auth api!");
});

authRouter.post("/register", authController.register);

authRouter.post("/login", authController.login);

module.exports = authRouter;


