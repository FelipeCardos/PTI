const { Cart } = require("../../database/models");

/**
 * Updates a cart with the specified details.
 *
 * @param {number} id - The ID of the cart to update.
 * @param {number} consumerId - The ID of the consumer associated with the cart.
 * @param {Date} orderDate - The order date of the cart.
 * @param {Date} deliveryDate - The delivery date of the cart.
 * @param {string} status - The status of the cart.
 * @returns {Promise<object>} The updated cart object.
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
