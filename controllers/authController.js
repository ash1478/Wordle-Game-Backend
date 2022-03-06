const bcrypt = require('bcryptjs/dist/bcrypt');
const User = require('../model/userSchema');
const jwt = require("jsonwebtoken");

module.exports.register = async (req, res) => {

    console.log("Reached Here");
    console.log(req.body);
    try {
        const { name, email, password, phoneNumber } = req.body;

        if (!(email && name && password)) {
            res.status(400).send("All inputs are required!");
        }

        const oldUser = await User.findOne({ email });
        console.log(oldUser);
        if (oldUser) {
            return res.status(409).send(JSON.stringify("User Already Exists!"));
        }

        let encryptPwd = await bcrypt.hash(password, 10);

        let user = await User.create({
            name: name,
            email: email,
            password: encryptPwd,
            phoneNumber: phoneNumber
        });

        console.log(user._id);
        const token = jwt.sign(
            { _id: user._id, email },
            process.env.TOKEN_KEY
        );

        user.token = token;
        user.save();
        res.status(201).json({ success: true, data: user });

    } catch (err) {
        console.log(err);
    }
}

module.exports.login = async (req, res) => {

    console.log(req.body);
    try {
        const { email, password } = req.body;

        if (!(email && password)) {
            res.status(400).send("All input is required");
        }
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            res.status(200).json({ success: true, data: user });
        }
        else res.status(400).send("Invalid Credentials");
    } catch (err) {
        console.log(err);
    }
}