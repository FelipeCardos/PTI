const express = require("express");

const Address = require("./Address/Users.Address.post");
const ProductionUnit = require("./ProductionUnit/Users.ProductionUnits.post");
const Vehicle = require("./Vehicle/Users.Vehicles.post");
const Cart = require("./Cart/Users.Carts.post");

const router = express.Router();

router.use("/:id/address", Address);
router.use("/:id/productionUnits", ProductionUnit);
router.use("/:id/vehicles", Vehicle);
router.use("/:id/carts", Cart);

module.exports = router;
