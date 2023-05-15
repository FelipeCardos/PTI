const express = require("express");

const Address = require("./Address/Users.Address.get");
const ProductionUnit = require("./ProductionUnit/Users.ProductionUnits.get");
const Cart = require("./Cart/Users.Carts.get");
const CartCartLines = require("./Cart/CartLine/Users.Carts.CartLines.get");
const Credentials = require("./Credentials/Users.Credentials.get");
const Vehicles = require("./Vehicle/Users.Vehicles.get");

const router = express.Router();

const {
  FindUserById,
  FindAllUsers,
} = require("../../../../controllers/User/findUsers");

router.get("/", (req, res) => {
  FindAllUsers().then((users) => {
    if (users === null) {
      res.status(404).send("Not Found");
    } else {
      res.status(200).json({ users: users });
    }
  });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  FindUserById(id).then((user) => {
    if (user === null) {
      res.status(404).send("Not Found");
    } else {
      res.status(200).json({ user: user });
    }
  });
});

router.use("/:id/address", Address);
router.use("/:id/productionUnits", ProductionUnit);
router.use("/:id/carts", Cart);
router.use("/:id/carts/:id/cartLines", CartCartLines);
router.use("/:id/credentials", Credentials);
router.use("/:id/vehicles", Vehicles);

module.exports = router;
