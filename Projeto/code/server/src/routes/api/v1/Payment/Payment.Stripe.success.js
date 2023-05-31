const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  UpdateCart,
  UpdateCartOrderDateWithId,
  UpdateCartDeliveryDateWithId,
  UpdateCartStatusWithId,
} = require("../../../../controllers/Cart/updateCart");

const {
  UpdateCartLine,
  UpdateCartLineStatusWithCartIdAndProductId,
  UpdateCartLineVehicleIdWithCartIdAndProductId,
  UpdateCartLineAmountWithCartIdAndProductId,
  UpdateCartLineDeliveryDateWithCartIdAndProductId,
  UpdateAllCartLinesStatusWithCartId,
  UpdateAllCartLinesDeliveryDateWithCartId,
} = require("../../../../controllers/CartLine/updateCartLine");

// import routes

router.get("/", (req, res) => {
  const { cartId } = req.session;
  console.log("cartId", cartId);
  UpdateCartStatusWithId(cartId, "PROCESSING");
  UpdateCartDeliveryDateWithId(cartId, new Date());
  UpdateAllCartLinesStatusWithCartId(cartId, "PROCESSING");
  UpdateAllCartLinesDeliveryDateWithCartId(cartId, new Date());
  res.redirect("http://localhost:5173/");
});

module.exports = router;
