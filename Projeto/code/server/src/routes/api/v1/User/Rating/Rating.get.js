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
  const producerId = req.params.id;
  const ratings = await FindAllRatingsWithProducerId(producerId);
  res.send(ratings);
});

module.exports = router;
