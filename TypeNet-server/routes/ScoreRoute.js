const express = require("express");
const scoreRepo = require("../repositories/repository.score");
const router = express.Router();


// get all scores
router.get("", scoreRepo.getAllScores);

// get score by id
router.get("/:scoreId", scoreRepo.getScoreById);

// post score
router.post("", scoreRepo.postScore);

// add comment to score
router.post("/addComment", scoreRepo.addCommentToScore);


module.exports = router;