const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require('../models/user');

exports.registerUser = async (req, res) => {
    try {
        const {username, email, password} = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({msg: "Not all fields have been entered."});
        }

        let user = await User.findOne({email: email});
        if (user) {
            return res.status(400).json({msg: "User already exists."});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const userData = {
            username: username,
            email: email,
            password: hashedPassword,
        };

        await User.create(userData);
    } catch (err) {
        return res.status(500).json({error: err.message});
    }
};

exports.loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        if (!email || !password) {
            return res.status(400).json({msg: "Not all fields have been entered."});
        }

        const user = await User.findOne({email: email});
        if (!user) {
            return res.status(400).json({msg: "No account with this email has been registered."});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({msg: "Invalid credentials."});
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "1d"});

        return res.status(200).json({
            token: token,
            message: "Login successful."
        });

    } catch (err) {
        return res.status(500).json({error: err.message});
    }
}