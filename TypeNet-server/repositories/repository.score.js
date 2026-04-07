const User = require("../models/UserModel");
const Score = require("../models/ScoreModel");
const Comment = require("../models/CommentModel");


// 3. Get All Scores
async function getAllScores(req, res) {
    try {
        let result; // simpan hasil di result
        
        // get semua score dan sort berdasarkan UpdatedAt dengan descending order
        // jangan lupa untuk menggunakan populate pada owner dan comment, serta author dari comment
        // kirimkan response dengan status 200
    } catch (err) {
        // kirimkan response dengan status 400
        console.log(`Error Message: ${err.message}`);
    }
}

// 4. Get Score By ID
async function getScoreById(req, res) {
    try {
        const { scoreId } = req.params;
        
        // get score berdasarkan id di param
        // jika score tidak ditemukan throw error
        // kirimkan response dengan status 200
    } catch (error) {
        // kirimkan response dengan status 400
        console.log(error);
    }
}

// 5. Post Score
async function postScore(req, res) {
    try {
        const { owner, value, text } = req.body;

        // cek apakah owner exist (Hint: gunakan exists pada User model)
        // jika owner tidak exist throw error
        // buatlah new Score dengan owner, value, dan text
        // simpan score ke database
        // simpan score id dari score yang telah dipost ke scores milik owner (Hint: gunakan updateOne dan $push)
        // kirimkan response dengan status 200
    } catch (err) {
        // kirimkan response dengan status 400
        console.log(`Error Message: ${err.message}`);
    }
}

// 6. Add Comment to Score
async function addCommentToScore(req, res) {
    try {
        const { post, author, text } = req.body;
        
        // cek apakah author (User) dan post (Score) exist, throw error jika tidak
        // buatlah new Comment dan simpan ke database
        // simpan comment id ke comments milik post
        // kirimkan response dengan status 200
    } catch (err) {
        // kirimkan response dengan status 400
        console.log(`Error Message: ${err.message}`);
    }
}


module.exports = {
    postScore,
    getAllScores,
    getScoreById,
    addCommentToScore,
}