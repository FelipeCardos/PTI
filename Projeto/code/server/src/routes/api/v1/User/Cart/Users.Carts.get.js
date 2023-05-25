const express = require("express");

const {
  FindProductWithId,
} = require("../../../../../controllers/Product/findProducts");

const {
  FindAllCarts,
  FindCartWithId,
  FindAllCartsWithUserId,
} = require("../../../../../controllers/Cart/findCarts");
const {
  FindAllCartLinesWithCartId,
} = require("../../../../../controllers/CartLine/findCartLines");
const { GetCartCost } = require("../../../../../controllers/Cart/getCartCost");

const CartLine = require("./CartLine/Users.Carts.CartLines.get");
const { FindUserById } = require("../../../../../controllers/User/findUsers");

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
          await FindAllCartLinesWithCartId(c.dataValues.id).then(
            async (cartLines) => {
              carts[i].dataValues["cart_lines"] = cartLines;
              for (let j = 0; j < cartLines.length; j++) {
                await FindProductWithId(
                  cartLines[j].dataValues.product_id
                ).then(async (product) => {
                  carts[i].dataValues.cart_lines[j].dataValues["product"] =
                    product;
                  await FindUserById(product.dataValues.producer_id).then(
                    (producer) => {
                      carts[i].dataValues.cart_lines[
                        j
                      ].dataValues.product.dataValues["producer"] = producer;
                    }
                  );
                });
              }
            }
          );
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
