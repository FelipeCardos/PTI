const express = require("express");

const { CreateProductionUnit } = require("../../../../controllers/ProductionUnit/createProductionUnit");
const { checkAuthenticated, checkUsersIsAdminOrProducer } = require("../../../../middleware/UserAuth");

const router = express.Router();

router.post('/', checkAuthenticated, checkUsersIsAdminOrProducer, async (req, res) => {
    let {producer_id, capacity, address_id } = req.body;

    if (producer_id === undefined) {
        if (req.user.typeUser === "Producer") {
            producer_id = req.user.id;
        } else {
            res.status(400).send("Bad Request");
            return;
        }
    }
    if (capacity === undefined) {
        console.log("capacity undefined");
        res.status(400).send("Bad Request");
        return;
    }
    if (address_id === undefined) {
        address_id = null;
    }

    console.log(producer_id, capacity, address_id);

    CreateProductionUnit(producer_id, capacity, address_id).then((productionUnit) => {
        if (productionUnit) {
            res.status(200).send("Created");

        } else {
            res.status(400).send("Bad Request");
        }
    });
});

module.exports = router;