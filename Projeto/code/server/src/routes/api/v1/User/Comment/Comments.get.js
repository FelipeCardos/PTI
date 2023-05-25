const express = require("express");

const {
  FindAllComments,
  FindCommentWithId,
  FindAllCommentsWithUserId,
  FindAllCommentsWithProductId,
  FindAllCommentsWithParentCommentId,
  FindAllCommentsWithoutParentComment,
} = require("../../../../../controllers/Comment/findComment");

const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  const userId = req.params.id;
  const comments = await FindAllCommentsWithUserId(userId);
  res.send(comments);
});

module.exports = router;
