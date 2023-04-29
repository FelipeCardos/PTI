const express = require("express");
const router = express.Router({ mergeParams: true });

const {FindUserById} = require('../../../../../controllers/User/findUsers');
const {CreateAddress} = require('../../../../../controllers/Address/createAddress');

router.post("/", (req, res) => {
    const id = req.params.id;
    const {country, state, street, postal_code} = req.body;

    if (country == undefined || state == undefined || street == undefined || postal_code == undefined) {
        res.status(400).send("Bad Request");
    } else {
        FindUserById(id).then((user) => {
            if (user === null) {
                res.status(404).send("Not Found");
            } else {
                CreateAddress(country, state, street, postal_code).then((address) => {
                    user.address_id = address.id;
                    user.save().then(() => {
                        res.status(200).send("Created");
                    });
                });
            }
        });
    }
});


module.exports = router;