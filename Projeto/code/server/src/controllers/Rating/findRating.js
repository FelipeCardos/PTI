const { Rating } = require("../../database/models");

async function FindAllRatings() {
  const ratings = await Rating.findAll();
  return ratings;
}

async function FindRatingWithId(id) {
  const rating = await Rating.findOne({
    where: {
      id: id,
    },
  });
  return rating;
}

async function FindAllRatingsWithUserId(userId) {
  const ratings = await Rating.findAll({
    where: { consumer_id: userId },
  });
  return ratings;
}

async function FindAllRatingsWithProducerId(producerId) {
  const ratings = await Rating.findAll({
    where: { producer_id: producerId },
  });
  return ratings;
}

async function FindAllRatingsWithProductId(productId) {
  const ratings = await Rating.findAll({
    where: { product_id: productId },
  });
  return ratings;
}

async function FindAllRatingsWithRating(rating,consumerId,producer_id) {
  let ratings = null;  
  if(consumerId){
      ratings = await Rating.findAll({
        where: 
        { 
          rating: rating,
          consumer_id: consumerId,
        },
      });
    }
    else{
      ratings = await Rating.findAll({
        where: 
        {
          rating: rating,
          producer_id: producer_id,
        },
      }); 
    }
    return ratings;
}

module.exports = {
  FindAllRatings,
  FindRatingWithId,
  FindAllRatingsWithUserId,
  FindAllRatingsWithProducerId,
  FindAllRatingsWithProductId,
  FindAllRatingsWithRating,
};
