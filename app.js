const express = require('express');
const mongoose = require('mongoose');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const wordRouter = require('./routes/wordRouter');
const gameRouter = require('./routes/gameRouter');
const authRouter = require('./routes/authRouter');
dotenv.config()
const port = process.env.PORT || "8000";


mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Mongo Connected')
    })
    .catch(err => console.log(err))


app.use(cors({
    origin: "*",
    credentials: true
}))    
app.use(express.json())
app.use("/word", wordRouter);
app.use("/game", gameRouter);
app.use("/auth", authRouter);



app.listen(port, () => {
    console.log("Server is active at port : " + process.env.PORT);
})