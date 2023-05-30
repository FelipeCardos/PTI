const express = require("express");

const {
  FindAllCartLines,
  FindCartLineWithCartIdAndProductId,
  FindAllCartLinesWithCartId,
  FindAllCartLinesWithProductId,
  FindAllCartLinesWithStatus,
  FindAllCartLinesWithVehicleId,
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

module.exports = router;
