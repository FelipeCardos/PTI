const express = require("express");

const {
  FindAllCarts,
  FindCartWithId,
  FindAllCartsWithUserId,
} = require("../../../../../controllers/Cart/findCarts");
const {
  FindCartLinesWithId,
} = require("../../../../../controllers/CartLine/findCartLines");
const { GetCartCost } = require("../../../../../controllers/Cart/getCartCost");

const CartLine = require("./CartLine/Users.Carts.CartLines.get");

const router = express.Router({ mergeParams: true });

router.get("/", (req, res) => {
  // http://localhost:3000/api/v1/users/:user_id/carts example
  const userId = req.params.id;
  FindAllCartsWithUserId(userId).then(async (carts) => {
    if (carts) {
      for (let i = 0; i < carts.length; i++) {
        await FindCartWithId(carts[i].dataValues.id).then(async (c) => {
          await GetCartCost(c.dataValues.id).then((cartPrice) => {
            carts[i].dataValues["price"] = cartPrice;
          });
          await FindCartLinesWithId(c.dataValues.id).then((cartLines) => {
            carts[i].dataValues["cart_lines"] = cartLines;
          });
        });
      }
      res.status(200).json(carts);
    } else {
      res.status(404).send("Carts not found");
    }
  });
});

router.get("/:idCart", (req, res) => {
  const idCart = req.params.idCart;
  FindCartWithId(idCart).then((cart) => {
    if (cart) {
      let cartWithCost = cart.dataValues;
      GetCartCost(cart.id).then((cartPrice) => {
        res.status(200).json({ ...cartWithCost, ["price"]: cartPrice });
      });
    } else {
      res.status(404).send("Cart not found");
    }
  });
});

router.use("/:idCart/cartLines", CartLine);

module.exports = router;
