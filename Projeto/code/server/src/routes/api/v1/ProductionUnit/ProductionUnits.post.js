const express = require("express");

const { CreateProductionUnit } = require("../../../../controllers/ProductionUnit/createProductionUnit");
const { checkAuthenticated } = require("../../../../middleware/UserAuth");

const router = express.Router();

router.post('/', checkAuthenticated ,async (req, res) => {
    const { producer_id, capacity, address_id } = req.body;
    if (producer_id === undefined) {
        res.status(400).send("Bad Request");
    }
    if (capacity === undefined) {
        capacity = null;
    }
    if (address_id === undefined) {
        address_id = null;
    }
    CreateProductionUnit(producer_id, capacity, address_id).then((bool) => {
        if (bool === true) {
            res.status(200).send("Created");
        } else {
            res.status(400).send("Bad Request");
        }
    });
});

module.exports = router;