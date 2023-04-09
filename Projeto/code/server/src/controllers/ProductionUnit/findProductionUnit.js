const {ProductionUnit} = require('../../database/models');

async function FindProductionUnits(id) {
    const productionUnit = await ProductionUnit.findAll({
        where: {
        id
        }
    });
    return productionUnit;
}

async function FindAllProductionUnits() {
    const productionUnits = await ProductionUnit.findAll();
    return productionUnits;
}

module.exports = { FindProductionUnits, FindAllProductionUnits };