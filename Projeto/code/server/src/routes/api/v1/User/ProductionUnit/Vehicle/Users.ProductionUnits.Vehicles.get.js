const express = require("express");

const { FindAllVehiclesFromProductionUnit } = require('../../../../../../controllers/Vehicle/findVehicle');

const router = express.Router();

router.get('/', async (req, res) => {
    const id = req.params.productionUnitsId;
    FindAllVehiclesFromProductionUnit(id).then((vehicles) => {
        if (vehicles === null) {
            res.status(404).send("Not Found");
        } else {
            res.status(200).json({ vehicles: vehicles });
        }
    });
});

module.exports = router;