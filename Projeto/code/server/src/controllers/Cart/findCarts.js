const {Cart} = require('../../database/models');

async function FindCartWithId(id) {
    const cart = await Cart.findOne({
        where: {
            id: id
        }
    });
    return cart;
}

async function FindAllCarts() {
    const carts = await Cart.findAll();
    return carts;
}


async function FindAllCartsWithUserId(userId) {
    const carts = await Cart.findAll({
        where: {
            consumer_id: userId
        }
    });
    return carts;
}

async function FindCartWithUserIdAndCartId(userId, cartId) {
    const cart = await Cart.findOne({
        where: {
            consumer_id: userId,
            id: cartId
        }
    });
    return cart;
}


module.exports = {  FindCartWithId, FindAllCarts, FindAllCartsWithUserId, FindCartWithUserIdAndCartId};