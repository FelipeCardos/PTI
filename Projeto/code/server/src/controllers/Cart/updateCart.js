const { Cart } = require("../../database/models");

/**
 * Updates a cart with all the field given.
 *
 * @param id - The id of the cart, we already suppose it exists.
 * @param consumerId - The id of the owner of the cart.
 * @param orderDate - The date of the order.
 * @param deliveryDate - The date of the delivery.
 * @param status - The status of the cart.
 * @returns Cart atualizado
 */
async function UpdateCart(id, consumerId, orderDate, deliveryDate, status) {
  const cart = await Cart.findOne({
    where: {
      id: id,
    },
  });
  if (consumerId) cart.consumer_id = consumerId;
  if (orderDate) cart.order_date = orderDate;
  if (deliveryDate) cart.delivery_date = deliveryDate;
  if (status) cart.status = status;
  await cart.save();
  return cart;
}

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
  UpdateCart,
  UpdateCartOrderDateWithId,
  UpdateCartDeliveryDateWithId,
  UpdateCartStatusWithId,
};
