const { json } = require("express/lib/response");
const Redis = require("ioredis");
const cryptoJS = require('crypto-js');
const { default: mongoose } = require("mongoose");
const Word = require("../model/wordSchema");
const redisCli = new Redis({
    port: process.env.REDIS_PORT, // Redis port
    host: process.env.REDIS_HOST, // Redis host
    password: process.env.REDIS_PWD,
    db: process.env.REDIS_DB,
})

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

module.exports.index = async (req, res) => { 
    const key = new Date().toISOString().split('T')[0] + ":WORD";
    const word = await redisCli.get(key);
    if (!word) { 
        const words = await Word.find({ isUsed: false });
        if (!words) return res.status(404).send("No words");
        const index = getRandomInt(words.length);
        let currWord = words[index];
        res.status(200).send({ isSuccess: true, data: currWord});
        await Word.findByIdAndUpdate(mongoose.Types.ObjectId(words[index]._id), {
                isUsed: true
        });
        return await redisCli.set(key, JSON.stringify(currWord));
    }
    console.log({ isSuccess: true, data: JSON.parse(word) });
    return res.status(200).json({ isSuccess: true, data: JSON.parse(word)});
}

module.exports.setWords = async (req, res) => { 
    return res.status(200).send(await Word.create({
        word: req.body.word,
        info: req.body.info
    }));
}

module.exports.removeKey = async (req, res) => { 
    const key = new Date().toISOString().split('T')[0] + ":WORD";
    await redisCli.del(key);
    return res.status(200).send(await redisCli.get(key));
}