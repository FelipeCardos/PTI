const { CartLine } = require("../../database/models");

async function DeleteCartLineWithCartIdAndProductId(cartId, productId) {
  const cartLine = await CartLine.findOne({
    where: {
      cart_id: cartId,
      product_id: productId,
    },
  });
  await cartLine.destroy();
  return cartLine;
}

module.exports = { DeleteCartLineWithCartIdAndProductId };
