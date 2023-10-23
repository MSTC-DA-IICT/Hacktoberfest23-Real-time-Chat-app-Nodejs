const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require('../models/user');
const Chat = require('../models/chat');
const Message = require('../models/message');


exports.accessChat = async (req, res, next) => {
}

exports.fetchChat = async (req, res, next) => {
    try {
        let chats = await Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
            .populate("users")
            .populate("groupAdmin")
            .populate("latestMessage")
            .sort({ updatedAt: -1 });

        chats = await User.populate(chats, {
            path: "latestMessage.sender",
            select: "name email pic",
        });

        return res.status(200).json({
            message: "Fetched chats successfully.",
            data: {
                chats,
            },
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Something went wrong. Please try again.",
        });
    }
}

exports.createGroupChat = async (req, res, next) => {
    try {
        const { name, users } = req.body;
        if (!name || !users) {
            return res.status(400).json({
                message: "Please enter all fields.",
            });
        }
        if (users.length < 2) {
            return res.status(400).json({
                message: "Please select at least 2 users.",
            });
        }
        users.push(req.userData.userId);

        const chat = new Chat({
            name,
            users: [...users, req.user._id],
            isGroupChat: true,
            groupAdmin: req.userData.userId,
        });

        const groupChat = await chat.save();

        return res.status(201).json({
            message: "Group chat created successfully.",
            data: {
                chat,
            },
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Something went wrong. Please try again.",
        });
    }
}