const {ProductionUnit} = require('../../database/models');

async function CreateProductionUnit(producer_id, capacity, address_id) {
    const productionUnit = await ProductionUnit.create({
        producer_id: producer_id,
        capacity: capacity,
        address_id: address_id
    }).catch((err) => {
        console.log(err);
        return false;
    });
    return true;
}




module.exports = { CreateProductionUnit };