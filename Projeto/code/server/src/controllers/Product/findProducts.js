const {Product} = require('../../database/models');


async function ProductWithId(id) {
    const product = await Product.findOne({
        where: {
            id: id
        }
    });
    return product;
}

async function FindAllProducts() {
    const products = await Product.findAll();
    return products;
}

module.exports = {  ProductWithId, FindAllProducts};