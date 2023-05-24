const { ConsumerVote } = require("../../database/models");

async function DeleteConsumerVoteWithConsumerIdAndCommentId(
  consumerId,
  commentId
) {
  const consumerVote = await ConsumerVote.findOne({
    where: {
      consumer_id: consumerId,
      comment_id: commentId,
    },
  });
  await consumerVote.destroy();
  return consumerVote;
}

module.exports = { DeleteConsumerVoteWithConsumerIdAndCommentId };
