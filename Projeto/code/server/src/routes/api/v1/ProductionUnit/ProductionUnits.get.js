const express = require("express");

const { FindProductionUnits, FindAllProductionUnits } = require('../../../../controllers/ProductionUnit/findProductionUnit');
const { checkAuthenticated, checkUsersIsProducer, checkUsersIsConsumer } = require("../../../../middleware/UserAuth");

const router = express.Router();

router.get('/', checkAuthenticated,async (req, res) => {
    FindAllProductionUnits().then((productionUnits) => {
        if (productionUnits === null) {
            res.status(404).send("Not Found");
        } else {
            res.status(200).json({ productionUnits: productionUnits });
        }
    });
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    FindProductionUnits(id).then((productionUnit) => {
        if (productionUnit === null) {
            res.status(404).send("Not Found");
        } else {
            res.status(200).json({ productionUnit: productionUnit });
        }
    });
});

module.exports = router;