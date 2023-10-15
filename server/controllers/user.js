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