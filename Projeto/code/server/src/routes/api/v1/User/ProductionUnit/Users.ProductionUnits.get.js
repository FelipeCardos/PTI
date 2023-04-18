const express = require("express");

const { FindAllProductionUnitsFromUser } = require('../../../../../controllers/ProductionUnit/findProductionUnit');
const Vehicle = require('./Vehicle/Users.ProductionUnits.Vehicles.get')
const { checkAuthenticated, checkUsersIsAdminOrProducer, checkIfUserIsOwnerOfTheResource } = require("../../../../../middleware/UserAuth");

const router = express.Router({ mergeParams: true});

router.get('/', checkAuthenticated, checkUsersIsAdminOrProducer, checkIfUserIsOwnerOfTheResource, async (req, res) => {
    const id = req.params.id;
    FindAllProductionUnitsFromUser(id).then((productionUnits) => {
        if (productionUnits === null) {
            res.status(404).send("Not Found");
        } else {
            res.status(200).json({ productionUnits: productionUnits });
        }
    });

});

router.use('/:productionUnitsId/vehicles', Vehicle);


module.exports = router;