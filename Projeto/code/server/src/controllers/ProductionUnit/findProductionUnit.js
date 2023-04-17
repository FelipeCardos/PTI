const {ProductionUnit} = require('../../database/models');

async function FindProductionUnits(id) {
    const productionUnit = await ProductionUnit.findAll({
        where: {
        id
        }
    });
    return productionUnit;
}

async function FindAllProductionUnitsFromUser(id) {
    const productionUnits = await ProductionUnit.findAll({
        where: {
            producer_id: id
        }
    });
    return productionUnits;
}

async function FindAllProductionUnits() {
    const productionUnits = await ProductionUnit.findAll();
    return productionUnits;
}

module.exports = { FindProductionUnits, FindAllProductionUnits, FindAllProductionUnitsFromUser };