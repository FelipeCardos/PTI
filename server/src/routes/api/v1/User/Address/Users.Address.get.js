const express = require("express");
const router = express.Router({ mergeParams: true });

const {FindUserById} = require('../../../../../controllers/User/findUsers');
const {FindAddressById} = require('../../../../../controllers/Address/findAddress');

router.get("/", (req, res) => {
    const id = req.params.id;
    
    FindUserById(id).then((user) => {
        if (user === null) {
            res.status(404).send("Not Found");
        } else {
            FindAddressById(user.address_id).then((address) => {
                if (address === null) {
                    res.status(404).send("Not Found");
                } else {
                    res.status(200).json({address: address});
                }
            });
        }
    });
});



module.exports = router;