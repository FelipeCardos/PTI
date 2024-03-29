const { FindAllCartLinesWithCartId } = require("../CartLine/findCartLines");
const { FindProductWithId } = require("../Product/findProducts");

async function GetCartCost(cartId) {
  let cost = 0;
  const notAllowedStatus = ["CANCELLED", "FAILURE"];
  const cartlines = await FindAllCartLinesWithCartId(cartId);
  for (const cartLine of cartlines) {
    if (!notAllowedStatus.includes(cartLine.status)) {
      const product = await FindProductWithId(cartLine.product_id);
      cost += product.price * cartLine.amount;
    }
  }
  console.log(cost);
  return cost;
}

module.exports = { GetCartCost };
