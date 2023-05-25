const express = require("express");

const {
  FindAllWishlist,
  FindWishlistWithId,
  FindAllWishlistWithConsumerId,
  FindAllWishlistWithProductId,
} = require("../../../../../controllers/Wishlist/findWishlist");

const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  const consumerId = req.params.id;
  const wishlist = await FindAllWishlistWithConsumerId(consumerId);
  res.send(wishlist);
});

module.exports = router;
