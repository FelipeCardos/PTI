const { FindAllCartLinesWithCartId } = require("../CartLine/findCartLines");
const { FindProductWithId } = require("../Product/findProducts");

async function CreatePaymentLineItems(cartId) {
  const lineItems = [];
  const cartLines = await FindAllCartLinesWithCartId(cartId);
  for (const cartLine of cartLines) {
    const product = await FindProductWithId(cartLine.product_id);
    const lineItem = {
      price_data: {
        currency: "eur",
        product_data: {
          name: product.name,
        },
        unit_amount: product.price,
      },
      quantity: cartLine.amount,
    };
    lineItems.push(lineItem);
  }
  return lineItems;
}

module.exports = { CreatePaymentLineItems };
