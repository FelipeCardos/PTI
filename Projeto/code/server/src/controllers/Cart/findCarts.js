const { Cart } = require("../../database/models");

async function FindAllCarts() {
  const carts = await Cart.findAll();
  return carts;
}

async function FindCartWithId(id) {
  const cart = await Cart.findOne({
    where: {
      id: id,
    },
  });
  return cart;
}

async function FindAllCartsWithUserId(userId) {
  const carts = await Cart.findAll({
    where: {
      consumer_id: userId,
    },
  });
  return carts;
}

async function FindAllCartsWithStatus(status) {
  const carts = await Cart.findAll({
    where: {
      status: status,
    },
  });
  return carts;
}

async function FindCartWithUserIdAndCartId(userId, cartId) {
  const cart = await Cart.findOne({
    where: {
      consumer_id: userId,
      id: cartId,
    },
  });
  return cart;
}

async function FindAllCartsWithUserIdAndStatus(userId, status) {
  const carts = await Cart.findAll({
    where: {
      consumer_id: userId,
      status: status,
    },
  });
  return carts;
}

module.exports = {
  FindAllCarts,
  FindCartWithId,
  FindAllCartsWithUserId,
  FindAllCartsWithStatus,
  FindCartWithUserIdAndCartId,
  FindAllCartsWithUserIdAndStatus,
};
