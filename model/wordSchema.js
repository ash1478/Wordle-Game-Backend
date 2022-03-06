const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let wordSchema = new Schema(
    {
        word: {
            type: String,
            required: true
        },
        info: [{
            type: String,
            required: true,
        }],
        isUsed: {
            type: Boolean,
            required: true,
            default: false
        }
    }
);

let Word = mongoose.model("word", wordSchema);

module.exports = Word;