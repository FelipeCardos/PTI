const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the LocalShop API!" });
});

const Auth = require("./Auth/Auth.root");
router.use("/auth", Auth);

const Cart = require("./Cart/Carts.root");
router.use("/carts", Cart);

const Cartline = require("./CartLine/CartLines.root");
router.use("/cartLines", Cartline);

const Category = require("./Category/Categories.root");
router.use("/categories", Category);

const Comment = require("./Comment/Comments.root");
router.use("/comments", Comment);

const Product = require("./Product/Products.root");
router.use("/products", Product);

const Productionunit = require("./ProductionUnit/ProductionUnits.root");
router.use("/productionUnits", Productionunit);

const User = require("./User/Users.root");
router.use("/users", User);

const Vehicle = require("./Vehicle/Vehicles.root");
router.use("/vehicles", Vehicle);

const Payment = require("./Payment/Payment.root");
router.use("/payment", Payment);

module.exports = router;
