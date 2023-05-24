const { Cart } = require("../../database/models");

async function UpdateCartOrderDateWithId(cartId, orderDate) {
  const cart = await Cart.findOne({
    where: {
      id: cartId,
    },
  });
  cart.order_date = orderDate;
  await cart.save();
  return cart;
}

async function UpdateCartDeliveryDateWithId(cartId, deliveryDate) {
  const cart = await Cart.findOne({
    where: {
      id: cartId,
    },
  });
  cart.delivery_date = deliveryDate;
  await cart.save();
  return cart;
}

async function UpdateCartStatusWithId(cartId, status) {
  const cart = await Cart.findOne({
    where: {
      id: cartId,
    },
  });
  cart.status = status;
  await cart.save();
  return cart;
}

module.exports = {
  UpdateCartOrderDateWithId,
  UpdateCartDeliveryDateWithId,
  UpdateCartStatusWithId,
};
