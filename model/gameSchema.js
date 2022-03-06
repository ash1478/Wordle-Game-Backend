const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let gameSchema = new Schema(
    {
        wordId: {
            type: mongoose.Types.ObjectId,
            ref: 'word',
            required: true
        },
        startTime: {
            type: Date,
            required: true,
            default: new Date()
        },
        endTime: {
            type: Date,
            required: false,
        },
        sessionId: {
            type: String,
            required: true,
        },
        noOfTries: {
            type: Number,
            required: false,
        },
        medal: {
            type: String,
            required: false,
        },
        userId: {
            type: mongoose.Types.ObjectId,
            ref: 'user'
        },
        attemptedWords: [{
            type: String,
            required: false
        }],
        timeTaken: {
            type: String,
            required: false,
        }
    }
);

let Game = mongoose.model("game", gameSchema);

module.exports = Game;