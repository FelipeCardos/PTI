const express = require("express");

const {
  FindCartLinesWithId,
} = require("../../../../../../controllers/CartLine/findCartLines");

const router = express.Router({ mergeParams: true });

router.get("/", (req, res) => {
  // http://localhost:3000/api/v1/users/:user_id/carts/:cart_id/cartLines example
  const cartId = req.params.idCart;
  FindCartLinesWithId(cartId).then((cartLines) => {
    if (cartLines) {
      res.status(200).json(cartLines);
    } else {
      res.status(404).send("CartLines not found");
    }
  });
});

module.exports = router;
