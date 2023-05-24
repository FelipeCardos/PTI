const { ConsumerVote } = require("../../database/models");

async function UpdateConsumerVoteUpvoteWithConsumerIdAndCommentId(
  consumerId,
  commentId,
  upvote
) {
  const consumerVote = await ConsumerVote.findOne({
    where: {
      consumer_id: consumerId,
      comment_id: commentId,
    },
  });
  consumerVote.upvote = upvote;
  await consumerVote.save();
  return consumerVote;
}

module.exports = { UpdateConsumerVoteUpvoteWithConsumerIdAndCommentId };
