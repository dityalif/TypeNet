const express = require("express");
const userRepo = require("../repositories/repository.user");
const router = express.Router();

// get all user
router.get("", userRepo.getAllUser);

// get user by credential
router.post("/login", userRepo.login);

// get user by id
router.get("/:userId", userRepo.getUserById);

// get user scores
router.get("/getUserScores/:userId", userRepo.getUserScores);

// add user
router.post("/addUser", userRepo.addUser);


module.exports = router;