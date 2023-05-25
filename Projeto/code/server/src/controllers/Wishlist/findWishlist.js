const { Wishlist } = require("../../database/models");

async function FindAllWishlist() {
  const wishlist = await Wishlist.findAll();
  return wishlist;
}

async function FindWishlistWithId(id) {
  const wishlist = await Wishlist.findAll({
    where: {
      id: id,
    },
  });
  return wishlist;
}

async function FindAllWishlistWithConsumerId(consumerId) {
  const wishlist = await Wishlist.findAll({
    where: {
      consumer_id: consumerId,
    },
  });
  return wishlist;
}

async function FindAllWishlistWithProductId(productId) {
  const wishlist = await Wishlist.findAll({
    where: {
      product_id: productId,
    },
  });
  return wishlist;
}

module.exports = {
  FindAllWishlist,
  FindWishlistWithId,
  FindAllWishlistWithConsumerId,
  FindAllWishlistWithProductId,
};
