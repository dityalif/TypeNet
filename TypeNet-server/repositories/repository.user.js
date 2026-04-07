const bcrypt = require('bcrypt');
const User = require("../models/UserModel");
const Score = require("../models/ScoreModel");
const Comment = require("../models/CommentModel");


async function addUser(req, res) {
    try {
        const { username, password } = req.body;

        const user = new User({ username: username, password: password });
        await user.save();

        res.status(200).json({ success: true, message: "Successfully Registered User", data: user });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
        console.log(`Error Message: ${err.message}`);
    }
}

async function login(req, res) {
    try {
        const { username, password } = req.body;
        
        const user = await User.findOne({ username: username });
        if (!user) throw new Error("User not found");

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error("Invalid Password");

        res.status(200).json({ success: true, message: "Found user", data: user });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
        console.log(`Error Message: ${err.message}`);
    }
}

// 1. Get All User and sort by UpdatedAt in descending order
async function getAllUser(req, res) {
    try {
        // get semua user dan sort berdasarkan UpdatedAt dengan descending order
        // kirimkan response dengan status 200
    } catch (err) {
        // kirimkan response dengan status 400
        console.log(err);
    }
}

// 2. Get User By ID (Hint: findOne and _id)
async function getUserById(req, res) {
    try {
        const { userId } = req.params;

        // get user berdasarkan id di param
        // jika user tidak ditemukan throw error
        // kirimkan response dengan status 200
    } catch (err) {
        // kirimkan response dengan status 400
        console.log(err);
    }
}

// 7. Get User Scores
async function getUserScores(req, res) {
    try {
        const { userId } = req.params;
        
        // get score milik user berdasarkan id di param
        // populate score, comment dari score, dan author dari comment
        // kirimkan response dengan status 200
    } catch (err) {
        // kirimkan response dengan status 400
        console.log(err);
    }
}


module.exports = {
    addUser,
    login,
    getAllUser,
    getUserById,
    getUserScores,
}