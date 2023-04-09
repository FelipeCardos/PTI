const {ProductionUnit} = require('../../database/models');

async function CreateProductionUnit(producer_id, capacity, address_id) {
    const productionUnit = await ProductionUnit.create({
        producer_id: producer_id,
        capacity: capacity,
        address_id: address_id
    }).then((productionUnit) => {
        return true;
    }).catch((err) => {
        return false;
    }
    );
}

module.exports = { CreateProductionUnit };