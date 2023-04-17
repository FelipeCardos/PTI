const express = require("express");

const {FindAllProducts, ProductWithId} = require('../../../../controllers/Product/findProducts');

const router = express.Router();


router.get("/", (req, res) => {
    FindAllProducts().then(products => {
        if(products) {
            res.status(200).json(products);
        } else {
            res.status(404).send("Products not found");
        }
    });
});

router.get("/:id", (req, res) => {
    const id = req.params.id;
    ProductWithId(id).then(product => {
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).send("Product not found");
        }
    });
});

module.exports = router;