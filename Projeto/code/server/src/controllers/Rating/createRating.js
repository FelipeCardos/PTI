const { Rating } = require("../../database/models");

async function CreateRatingProducer(consumer_id, producer_id, rating) {
  const ratingProducer = await Rating.create({
    consumer_id: consumer_id,
    producer_id: producer_id,
    rating: rating,
  });
  return ratingProducer;
}

async function CreateRatingProduct(consumer_id, product_id, rating) {
  const ratingProduct = await Rating.create({
    consumer_id: consumer_id,
    product_id: product_id,
    rating: rating,
  });
  return ratingProduct;
}

module.exports = { CreateRatingProducer, CreateRatingProduct };
