const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  UpdateCartStatusWithId,
} = require("../../../../controllers/Cart/updateCart");
const {UpdateAllCartLinesStatusWithCartId} = require("../../../../controllers/CartLine/updateCartLine");

// import routes

router.get("/", (req, res) => {
  const { cartId } = req.session;
  console.log("cartId", cartId);
  UpdateCartStatusWithId(cartId, "PROCESSING");
  UpdateAllCartLinesStatusWithCartId(cartId, "PROCESSING");
  res.redirect("http://localhost:3000/api/v1/");
});

module.exports = router;
