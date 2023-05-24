const { ConsumerVote } = require("../../database/models");

async function FindAllConsumerVotes() {
  const consumerVotes = await ConsumerVote.findAll();
  return consumerVotes;
}

async function FindAllConsumerVotesWithUserId(userId) {
  const consumerVote = await ConsumerVote.findAll({
    where: {
      consumer_id: userId,
    },
  });
  return consumerVote;
}

async function FindAllConsumerVotesWithCommentId(commentId) {
  const consumerVote = await ConsumerVote.findAll({
    where: {
      comment_id: commentId,
    },
  });
  return consumerVote;
}

async function FindAllConsumerVotesWithUpvote(upvote) {
  const consumerVote = await ConsumerVote.findAll({
    where: {
      upvote: upvote,
    },
  });
  return consumerVote;
}

module.exports = {
  FindAllConsumerVotes,
  FindAllConsumerVotesWithUserId,
  FindAllConsumerVotesWithCommentId,
  FindAllConsumerVotesWithUpvote,
};
