const express = require("express");

const {
  FindAllCartLines,
  FindCartLineWithId,
} = require("../../../../controllers/CartLine/findCartLines");

const router = express.Router();

router.get("/", (req, res) => {
  FindAllCartLines().then((products) => {
    if (products) {
      res.status(200).json(products);
    } else {
      res.status(404).send("CartLines not found");
    }
  });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  FindCartLineWithId(id).then((product) => {
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).send("CartLine not found");
    }
  });
});

module.exports = router;
