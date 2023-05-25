const express = require("express");

const {
  FindAllConsumerVotes,
  FindAllConsumerVotesWithUserId,
  FindAllConsumerVotesWithCommentId,
  FindAllConsumerVotesWithUpvote,
} = require("../../../../../controllers/ConsumerVote/findConsumerVote");

const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  const commentId = req.params.id;
  const consumerVotes = await FindAllConsumerVotesWithCommentId(commentId);
  res.status(200).json(consumerVotes);
});

module.exports = router;
