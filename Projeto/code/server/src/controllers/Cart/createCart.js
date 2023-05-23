const { Cart } = require("../../database/models");

async function CreateCart(consumer_id) {
  const cart = await Cart.create({
    consumer_id: consumer_id,
    order_date: null,
    status: "OPEN",
  });
  return cart;
}

module.exports = { CreateCart };
