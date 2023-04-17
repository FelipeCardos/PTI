const {FindCartLinesWithId} = require('../CartLine/findCartLines');
const {ProductWithId} = require('../Product/findProducts');

async function CreatePaymentLineItems(cartId) {
    const lineItems = [];
    const cartLines = await FindCartLinesWithId(cartId);
    for (const cartLine of cartLines) {
        const product = await ProductWithId(cartLine.product_id);
        const lineItem = {
                            price_data: {
                                currency: 'eur',
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

module.exports = {CreatePaymentLineItems};