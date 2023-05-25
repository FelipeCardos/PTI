const express = require("express");

const {
  FindAllRatings,
  FindRatingWithId,
  FindAllRatingsWithUserId,
  FindAllRatingsWithProducerId,
  FindAllRatingsWithProductId,
  FindAllRatingsWithRating,
} = require("../../../../../controllers/Rating/findRating");

const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  const productId = req.params.id;
  const ratings = await FindAllRatingsWithProductId(productId);
  res.send(ratings);
});

module.exports = router;
