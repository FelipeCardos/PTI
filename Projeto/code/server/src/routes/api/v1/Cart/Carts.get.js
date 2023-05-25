const express = require("express");

const CartLines = require("./CartLine/CartLines.get");

const {
  FindAllCarts,
  FindCartWithId,
  FindAllCartsWithUserId,
  FindAllCartsWithStatus,
  FindCartWithUserIdAndCartId,
  FindAllCartsWithUserIdAndStatus,
} = require("../../../../controllers/Cart/findCarts");

const {
  FindAllCartLines,
  FindCartLineWithCartIdAndProductId,
  FindAllCartLinesWithCartId,
  FindAllCartLinesWithProductId,
  FindAllCartLinesWithStatus,
  FindAllCartLinesWithVehicleId,
} = require("../../../../controllers/CartLine/findCartLines");

const {
  FindAllProducts,
  FindProductWithId,
  FindProductWithName,
  FindProductWithBarcode,
  FindAllProductsWithProducerId,
} = require("../../../../controllers/Product/findProducts");

const router = express.Router();

router.get("/", async (req, res) => {
  const carts = await FindAllCarts();
  if (!carts) return res.status(404).send("Carts not found");

  // Adicionar ao json a informação das cart_lines de cada cart
  for (let cart of carts) {
    let cartLines = await FindAllCartLinesWithCartId(cart.dataValues.id);

    if (cartLines.length > 0) {
      // Adicionar informação do produto a cada cart_line
      for (let cartLine of cartLines) {
        let product = await FindProductWithId(cartLine.dataValues.product_id);
        cartLine.dataValues.product = product;
      }
    }
    cart.dataValues.cart_lines = cartLines;
  }
  return res.send(carts);
});

router.get("/:id", async (req, res) => {
  const cart = await FindCartWithId(req.params.id);
  if (!cart) return res.status(404).send("Cart not found");

  // Adicionar ao json a informação das cart_lines de cada cart
  let cartLines = await FindAllCartLinesWithCartId(cart.dataValues.id);

  if (cartLines) {
    // Adicionar informação do produto a cada cart_line
    for (let cartLine of cartLines) {
      let product = await FindProductWithId(cartLine.dataValues.product_id);
      cartLine.dataValues.product = product;
    }
  }
  cart.dataValues.cart_lines = cartLines ? cartLines : [];
  return res.send(cart);
});

router.use("/:id/cartLines", CartLines);

module.exports = router;
