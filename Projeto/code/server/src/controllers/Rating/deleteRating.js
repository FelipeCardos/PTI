const { Rating } = require("../../database/models");

async function DeleteRatingWithId(id) {
  const rating = await Rating.findOne({
    where: {
      id: id,
    },
  });
  await rating.destroy();
  return rating;
}

module.exports = { DeleteRatingWithId };
