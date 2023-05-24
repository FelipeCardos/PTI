const { Cart } = require("../../database/models");

async function DeleteCartWithId(id) {
  const cart = await Cart.findOne({
    where: {
      id: id,
    },
  });
  await cart.destroy();
  return cart;
}

module.exports = { DeleteCartWithId };
