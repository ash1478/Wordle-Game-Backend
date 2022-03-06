const { default: mongoose } = require("mongoose");
const Game = require("../model/gameSchema");

module.exports.index = async (req,res) => {
    const { sessionId, userId, wordId } = req.body;
    if (!sessionId) return res.status(404).send("No sessionId found!");
    return res.status(200).send({
        isSucess: true,
        data: await Game.create({
            sessionId: sessionId,
            userId: userId ? mongoose.Types.ObjectId(userId): undefined,
            wordId: mongoose.Types.ObjectId(wordId)
        })
    })
}

module.exports.endGame = async (req, res) => {
    const { sessionId } = req.body;
    if (!sessionId) return res.status(404).send("No sessionId found!");
    return res.status(200).send({
        isSucess: true,
        data: await Game.findOneAndUpdate({
            sessionId: sessionId,
        }, {
            endTime: new Date(),
            noOfTries: req.body.noOfTries,
            attemptedWords: req.body.attemptedWords,
            medal: req.body.medal,
            userId: req.body.userId ? mongoose.Types.ObjectId(req.body.userId): undefined,
            timeTaken: req.body.timeTaken
        })
    }
    );
}