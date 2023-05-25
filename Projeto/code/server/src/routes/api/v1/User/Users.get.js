const express = require("express");

const Address = require("./Address/Users.Address.get");
const ProductionUnit = require("./ProductionUnit/Users.ProductionUnits.get");
const Cart = require("./Cart/Users.Carts.get");
const CartCartLines = require("./Cart/CartLine/Users.Carts.CartLines.get");
const Credentials = require("./Credentials/Users.Credentials.get");
const Vehicles = require("./Vehicle/Users.Vehicles.get");
const Ratings = require("./Rating/Rating.get");
const Comments = require("./Comment/Comments.get");
const Products = require("./Product/Products.get");
const Wishlist = require("./Wishlist/Wishlist.get");

const router = express.Router();

const {
  FindCredentialsByUserId,
} = require("../../../../controllers/Credentials/findCredentials");
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
      FindCredentialsByUserId(id).then((credentials) => {
        if (credentials) {
          res
            .status(200)
            .json({ ...user.dataValues, ["provider"]: credentials.provider });
        } else {
          res.status(200).json({ ...user.dataValues, ["provider"]: "local" });
        }
      });
    }
  });
});

router.use("/:id/address", Address);
router.use("/:id/productionUnits", ProductionUnit);
router.use("/:id/carts", Cart);
router.use("/:id/carts/:id/cartLines", CartCartLines);
router.use("/:id/credentials", Credentials);
router.use("/:id/vehicles", Vehicles);
router.use("/:id/ratings", Ratings);
router.use("/:id/comments", Comments);
router.use("/:id/products", Products);
router.use("/:id/wishlist", Wishlist);

module.exports = router;
