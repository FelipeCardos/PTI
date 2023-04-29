const express = require("express");

const {CartLinesWithId} = require("../../../../../../controllers/CartLine/findCartLines");

const router = express.Router({mergeParams: true});

router.get("/", (req, res) => {
    const cartId = req.params.idCart;
    CartLinesWithId(cartId).then(cartLines => {
        if (cartLines) {
            res.status(200).json(cartLines);
        } else {
            res.status(404).send("CartLines not found");
        }
    });
});


module.exports = router;