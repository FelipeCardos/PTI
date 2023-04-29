const express = require("express");

const { CreateProductionUnit } = require('../../../../../controllers/ProductionUnit/createProductionUnit');
const { checkAuthenticated, checkUsersIsAdminOrProducer, checkIfUserIsOwnerOfTheResource } = require("../../../../../middleware/UserAuth");

const router = express.Router({ mergeParams: true});

router.post('/', checkAuthenticated, checkUsersIsAdminOrProducer, checkIfUserIsOwnerOfTheResource,  async (req, res) => {
    const producer_id = req.params.id;
    const capacity = req.body.capacity;
    let address_id = req.body.address_id;

    if (capacity === undefined) {
        console.log("capacity undefined");
        res.status(400).send("Bad Request");
        return;
    }

    if (address_id === undefined) {
        address_id = null;
    }

    CreateProductionUnit(producer_id, capacity, address_id).then((productionUnit) => {
        if (productionUnit) {
            res.status(200).send("Created");

        } else {
            res.status(400).send("Bad Request");
        }
    });


});


module.exports = router;