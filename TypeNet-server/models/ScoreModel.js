const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema (
    {
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        value: {
            type: Number,
            required: true,
        },
        text: {
            type: String,
            default: "",
        },
        comments: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment",
        }],
    }, { timestamps: true }
)

const Score = mongoose.model("Score", scoreSchema);

module.exports = Score;