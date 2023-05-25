const express = require("express");

const ConsumerVote = require("./ConsumerVote/ConsumerVotes.get");

const {
  FindAllComments,
  FindCommentWithId,
  FindAllCommentsWithUserId,
  FindAllCommentsWithProductId,
  FindAllCommentsWithParentCommentId,
  FindAllCommentsWithoutParentComment,
} = require("../../../../controllers/Comment/findComment");

const router = express.Router();

router.get("/", async (req, res) => {
  const comments = await FindAllComments();
  res.status(200).json(comments);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const comment = await FindCommentWithId(id);
  res.status(200).json(comment);
});

router.use("/:id/consumerVotes", ConsumerVote);

module.exports = router;
