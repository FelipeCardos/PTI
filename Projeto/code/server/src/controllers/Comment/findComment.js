const { Comment } = require("../../database/models");

async function FindAllComments() {
  const comments = await Comment.findAll();
  return comments;
}

async function FindCommentWithId(id) {
  const comment = await Comment.findOne({
    where: {
      id: id,
    },
  });
  return comment;
}

async function FindAllCommentsWithUserId(userId) {
  const comments = await Comment.findAll({
    where: {
      user_id: userId,
    },
  });
  return comments;
}

async function FindAllCommentsWithProductId(productId) {
  const comments = await Comment.findAll({
    where: {
      product_id: productId,
    },
  });
  return comments;
}

async function FindAllCommentsWithParentCommentId(parentCommentId) {
  const comments = await Comment.findAll({
    where: {
      parent_comment: parentCommentId,
    },
  });
  return comments;
}

async function FindAllCommentsWithoutParentComment() {
  const comments = await Comment.findAll({
    where: {
      parent_comment: null,
    },
  });
  return comments;
}

module.exports = {
  FindAllComments,
  FindCommentWithId,
  FindAllCommentsWithUserId,
  FindAllCommentsWithProductId,
  FindAllCommentsWithParentCommentId,
  FindAllCommentsWithoutParentComment,
};
