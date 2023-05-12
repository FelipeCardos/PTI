const express = require("express");

const {
  FindAllCarts,
  FindCartWithId,
  FindAllCartsWithUserId,
} = require("../../../../../controllers/Cart/findCarts");
const { GetCartCost } = require("../../../../../controllers/Cart/getCartCost");

const CartLine = require("./CartLine/Users.Carts.CartLines.get");

const router = express.Router({ mergeParams: true });

router.get("/", (req, res) => {
  // http://localhost:3000/api/v1/users/:user_id/carts example
  const userId = req.params.id;
  let data = null;
  FindAllCartsWithUserId(userId).then(async (carts) => {
    if (carts) {
      for (let i = 0; i < carts.length; i++) {
        await FindCartWithId(carts[i].dataValues.id).then(async (c) => {
          c = c.dataValues;
          await GetCartCost(c.id).then((cartPrice) => {
            carts[i].dataValues["price"] = cartPrice;
          });
        });
      }
      data = carts;
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
