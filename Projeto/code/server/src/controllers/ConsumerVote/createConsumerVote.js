const { ConsumerVote } = require("../../database/models");

async function CreateConsumerVote(consumerId, comment_id, upvote) {
  const consumerVote = await ConsumerVote.create({
    consumer_id: consumerId,
    comment_id: comment_id,
    upvote: upvote,
  });
  return consumerVote;
}

module.exports = { CreateConsumerVote };
