const { Wishlist } = require("../../database/models");

async function DeleteWishlistWithId(id) {
  const wishlist = await Wishlist.findOne({
    where: {
      id: id,
    },
  });
  await wishlist.destroy();
  return wishlist;
}
