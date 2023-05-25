const { Wishlist } = require("../../database/models");

async function CreateWishlist(consumerId, product_id) {
  const wishlist = await Wishlist.create({
    consumer_id: consumerId,
    product_id: product_id,
  });
  return wishlist;
}

module.exports = { CreateWishlist };
