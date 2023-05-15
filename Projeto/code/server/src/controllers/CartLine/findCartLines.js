const { CartLine } = require("../../database/models");

async function FindCartLinesWithId(id) {
  const cartLine = await CartLine.findAll({
    where: {
      cart_id: id,
    },
  });
  return cartLine;
}

async function FindAllCartLines() {
  const cartLines = await CartLine.findAll();
  return cartLines;
}

async function FindCartLinesWithVehicleId(id) {
  const cartLines = await CartLine.findAll({
    where: {
      vehicle_id: id,
    },
  });
  return cartLines;
}

module.exports = {
  FindCartLinesWithId,
  FindAllCartLines,
  FindCartLinesWithVehicleId,
};
