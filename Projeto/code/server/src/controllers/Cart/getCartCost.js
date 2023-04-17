const {FindCartLinesWithId} = require('../CartLine/findCartLines');
const {ProductWithId} = require('../Product/findProducts');


async function GetCartCost(cartId) {
    let cost = 0;
    const cartlines =  await CartLinesWithId(cartId)
    for (const cartLine of cartlines) {
        const product = await ProductWithId(cartLine.product_id);
        cost += product.price * cartLine.amount;
    }
    console.log(cost);
    return cost;

}

module.exports = {GetCartCost};