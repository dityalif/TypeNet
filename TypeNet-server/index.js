require("dotenv").config();

const userRoutes = require('./routes/UserRoute');
const scoreRoutes = require('./routes/ScoreRoute');

const express = require('express');
const cors = require('cors');
const db = require('./config/db');

const port = process.env.PORT;
const app = express();


// connect to database
db.connectDB();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        methods: "GET,POST,PUT,DELETE",
        credentials: true
    })
);


// status
app.get('/status', (req, res) => {
    res.status(200).send({ status: "Server is running" });
})

// redirect /user to userRoutes
app.use("/user", userRoutes);

// redirect /score to scoreRoutes
app.use("/score", scoreRoutes);


app.listen(port, () => {
    console.log(`🚀 Server is running on PORT ${port}`);
})