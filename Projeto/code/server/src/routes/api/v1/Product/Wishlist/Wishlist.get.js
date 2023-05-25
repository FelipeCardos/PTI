const express = require("express");

const {
  FindAllWishlist,
  FindWishlistWithId,
  FindAllWishlistWithConsumerId,
  FindAllWishlistWithProductId,
} = require("../../../../../controllers/Wishlist/findWishlist");

const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  const productId = req.params.id;
  const wishlist = await FindAllWishlistWithProductId(productId);
  res.status(200).json(wishlist);
});

module.exports = router;
