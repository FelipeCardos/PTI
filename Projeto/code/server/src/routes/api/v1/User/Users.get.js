const express = require("express");

const Address = require("./Address/Users.Address.get");
const ProductionUnit = require("./ProductionUnit/Users.ProductionUnits.get");
const Cart = require("./Cart/Users.Carts.get");
const CartCartLines = require("./Cart/CartLine/Users.Carts.CartLines.get");

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

module.exports = router;
