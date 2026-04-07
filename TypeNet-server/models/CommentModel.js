const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema (
    {
        score: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Score",
            required: true,
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
    }, { timestamps: true }
)

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;