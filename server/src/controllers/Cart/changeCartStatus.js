const {Cart} = require('../../database/models');

async function ChangeCartStatus(cartId, status) {
    const cart = await Cart.findOne({
        where: {
            id: cartId
        }
    });
    cart.status = status;
    await cart.save();
    return cart;
}