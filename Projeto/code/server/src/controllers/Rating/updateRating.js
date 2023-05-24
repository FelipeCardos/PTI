const { Rating } = require("../../database/models");

async function UpdateRating(id, consumerId, producerId, productId, rating) {
  const rating = await Rating.findOne({
    where: { id: id },
  });
  if (consumerId) rating.consumer_id = consumerId;
  if (producerId) rating.producer_id = producerId;
  if (productId) rating.product_id = productId;
  if (rating) rating.rating = rating;
  await rating.save();
  return rating;
}

async function UpdateRatingRatingWithId(id, rating) {
  const rating = await Rating.findOne({
    where: { id: id },
  });
  if (rating) rating.rating = rating;
  await rating.save();
  return rating;
}

module.exports = { UpdateRating, UpdateRatingRatingWithId };
