const { Comment } = require("../../database/models");

async function CreateComment(user_id, product_id, text, parent_comment) {
  const comment = await Comment.create({
    user_id: user_id,
    product_id: product_id,
    comment: text,
    parent_comment: parent_comment,
    date: new Date(),
  });
  return comment;
}

module.exports = { CreateComment };
