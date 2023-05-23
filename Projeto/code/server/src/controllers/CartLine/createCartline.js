const { CartLine } = require("../../database/models");

async function CreateCartLine(cartId, productId, amount) {
  const cartLine = await CartLine.create({
    cart_id: cartId,
    product_id: productId,
    status: "OPEN",
    vehicle_id: null,
    amount: amount,
  });
  return cartLine;
}

module.exports = {
  CreateCartLine,
};
