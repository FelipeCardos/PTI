const express = require("express");

const {FindAllCarts, FindCartWithId, FindAllCartsWithUserId} = require("../../../../../controllers/Cart/findCarts");

const CartLine = require("./CartLine/Users.Carts.CartLines.get");

const router = express.Router({mergeParams: true});

router.get("/", (req, res) => {
    const userId = req.params.id;
    FindAllCartsWithUserId(userId).then(carts => {
        if (carts) {
            res.status(200).json(carts);
        } else {
            res.status(404).send("Carts not found");
        }
    });
});



router.get("/:idCart", (req, res) => {
    const id = req.params.id;
    FindCartWithId(id).then(cart => {
        if (cart) {
            res.status(200).json(cart);
        } else {
            res.status(404).send("Cart not found");
        }
    });
});

router.use("/:idCart/cartLines", CartLine);


module.exports = router;