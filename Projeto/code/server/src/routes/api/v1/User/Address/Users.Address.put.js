const express = require("express");
const router = express.Router({ mergeParams: true });

const {FindUserById} = require('../../../../../controllers/User/findUsers');
const {UpdateAddress} = require('../../../../../controllers/Address/updateAddress');


router.put("/", (req, res) => {
    const id = req.params.id;
    const {country, state, street, postal_code} = req.body;
    FindUserById(id).then((user) => {
        if (user === null) {
            res.status(404).send("Not Found");
        } else {
            UpdateAddress(user.address_id, country, state, street, postal_code).then((bool) => {
                if (bool) {
                    res.status(200).send("Updated");
                } else {
                    res.status(500).send("Internal Server Error");
                }
            });
        }
    });
});




module.exports = router;