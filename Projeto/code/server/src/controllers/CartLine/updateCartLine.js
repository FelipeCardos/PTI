const { CartLine } = require("../../database/models");

/**
 * Updates a cart line with the specified details.
 *
 * @param {number} cartId - The ID of the cart.
 * @param {number} productId - The ID of the product.
 * @param {string} status - The status of the cart line.
 * @param {number} vehicleId - The ID of the vehicle.
 * @param {number} amount - The amount of the cart line.
 * @param {Date} deliveryDate - The delivery date of the cart line.
 * @returns {Promise<object>} The updated cart line object.
 */
async function UpdateCartLine(
  cartId,
  productId,
  status,
  vehicleId,
  amount,
  deliveryDate
) {
  const cartLine = await CartLine.findOne({
    where: {
      cart_id: cartId,
      product_id: productId,
    },
  });
  if (status) cartLine.status = status;
  if (vehicleId) cartLine.vehicle_id = vehicleId;
  if (amount) cartLine.amount = amount;
  if (deliveryDate) cartLine.delivery_date = deliveryDate;
  await cartLine.save();
  return cartLine;
}

async function UpdateCartLineStatusWithCartIdAndProductId(
  cartId,
  productId,
  status
) {
  let cartLine = await CartLine.findOne({
    where: {
      cart_id: cartId,
      product_id: productId,
    },
  });
  cartLine.status = status;
  await cartLine.save();
  return cartLine;
}

async function UpdateAllCartLinesStatusWithCartId(cartId, status) {
  const cartLine = await CartLine.update(
    { status: status },
    { where: { cart_id: cartId } }
  );
  await cartLine.save();
  return cartLine;
}

async function UpdateCartLineVehicleIdWithCartIdAndProductId(
  cartId,
  productId,
  vehicleId
) {
  const cartLine = await CartLine.findOne({
    where: {
      cart_id: cartId,
      product_id: productId,
    },
  });
  cartLine.vehicle_id = vehicleId;
  await cartLine.save();
  return cartLine;
}

async function UpdateCartLineAmountWithCartIdAndProductId(
  cartId,
  productId,
  amount
) {
  const cartLine = await CartLine.findOne({
    where: {
      cart_id: cartId,
      product_id: productId,
    },
  });
  cartLine.amount = amount;
  await cartLine.save();
  return cartLine;
}

async function UpdateCartLineDeliveryDateWithCartIdAndProductId(
  cartId,
  productId,
  deliveryDate
) {
  const cartLine = await CartLine.findOne({
    where: {
      cart_id: cartId,
      product_id: productId,
    },
  });
  cartLine.delivery_date = deliveryDate;
  await cartLine.save();
  return cartLine;
}

async function UpdateAllCartLinesDeliveryDateWithCartId(cartId, deliveryDate) {
  const cartLine = await CartLine.update(
    { delivery_date: deliveryDate },
    { where: { cart_id: cartId } }
  );
  await cartLine.save();
  return cartLine;
}

module.exports = {
  UpdateCartLine,
  UpdateCartLineStatusWithCartIdAndProductId,
  UpdateCartLineVehicleIdWithCartIdAndProductId,
  UpdateCartLineAmountWithCartIdAndProductId,
  UpdateCartLineDeliveryDateWithCartIdAndProductId,
  UpdateAllCartLinesStatusWithCartId,
  UpdateAllCartLinesDeliveryDateWithCartId,
};
