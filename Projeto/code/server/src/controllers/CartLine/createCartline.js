const { CartLine } = require("../../database/models");

async function CreateCartLine(cartId, productId, production_unit_id, amount) {
  const cartLine = await CartLine.create({
    cart_id: cartId,
    product_id: productId,
    production_unit_id: production_unit_id,
    status: "OPEN",
    vehicle_id: null,
    amount: amount,
  });
  return cartLine;
}

module.exports = {
  CreateCartLine,
};
