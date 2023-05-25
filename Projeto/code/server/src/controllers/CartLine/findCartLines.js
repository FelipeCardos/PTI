const { CartLine } = require("../../database/models");

async function FindAllCartLines() {
  const cartLines = await CartLine.findAll();
  return cartLines;
}

async function FindCartLineWithCartIdAndProductId(cartId, productId) {
  const cartLine = await CartLine.findOne({
    where: {
      cart_id: cartId,
      product_id: productId,
    },
  });
  return cartLine;
}

async function FindAllCartLinesWithCartId(cartId) {
  const cartLine = await CartLine.findAll({
    where: {
      cart_id: cartId,
    },
  });
  return cartLine;
}

async function FindAllCartLinesWithProductId(productId) {
  const cartLines = await CartLine.findAll({
    where: {
      product_id: productId,
    },
  });
  return cartLines;
}

async function FindAllCartLinesWithStatus(status) {
  const cartLines = await CartLine.findAll({
    where: {
      status: status,
    },
  });
  return cartLines;
}

async function FindAllCartLinesWithVehicleId(vehicleId) {
  const cartLines = await CartLine.findAll({
    where: {
      vehicle_id: vehicleId,
    },
  });
  return cartLines;
}

module.exports = {
  FindAllCartLines,
  FindCartLineWithCartIdAndProductId,
  FindAllCartLinesWithCartId,
  FindAllCartLinesWithProductId,
  FindAllCartLinesWithStatus,
  FindAllCartLinesWithVehicleId,
};
