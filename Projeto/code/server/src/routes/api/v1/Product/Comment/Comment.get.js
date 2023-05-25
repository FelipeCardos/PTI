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
  const productId = req.params.id;
  const comments = await FindAllCommentsWithProductId(productId);
  res.status(200).json(comments);
});

module.exports = router;
