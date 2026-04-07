const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema (
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        scores: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Score",
        }],
    }, { timestamps: true }
)

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); // Only hash the password if it was modified

    try {
        const salt = await bcrypt.genSalt(10); // Generate a salt with 10 rounds
        this.password = await bcrypt.hash(this.password, salt); // Hash the password with the salt
        next();
    } catch (error) {
        next(error); // Pass the error to the next middleware if any
    }
})

const User = mongoose.model("User", userSchema);

module.exports = User;