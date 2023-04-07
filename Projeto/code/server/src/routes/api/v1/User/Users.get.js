const express = require("express");

const Address = require("./Address/Users.get.Address");

const router = express.Router();

const {FindUserById, FindAllUsers} = require('../../../../controllers/User/findUsers');

router.get("/", (req, res) => {
    FindAllUsers().then((users) => {
        if (users === null) {
            res.status(404).send("Not Found");
        } else {
            res.status(200).json({users: users});
        }
    });
});

router.get("/:id", (req, res) => {
    const id = req.params.id;
    FindUserById(id).then((user) => {
        if (user === null) {
            res.status(404).send("Not Found");
        } else {
            res.status(200).json({user: user});
        }
    });
});

router.use("/:id/address", Address);


module.exports = router;