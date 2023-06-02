const express = require("express");
const Stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const {
  checkAuthenticated,
  checkUsersIsProducer,
  checkUsersIsConsumer,
} = require("../../../../middleware/UserAuth");
const {
  CreatePaymentLineItems,
} = require("../../../../controllers/Payment/CreatePaymentLineItems");
const {
  UpdateCartStatusWithId,
} = require("../../../../controllers/Cart/updateCart");
const Success = require("./Payment.Stripe.success");
const router = express.Router();

router.get("/create-payment-intent", async (req, res) => {
  console.log(
    "create-payment-intent -----------------------------------------------------------------------------------------"
  );
  const { cartId } = req.query;
  console.log("cartId: " + cartId);

  const lineItems = await CreatePaymentLineItems(cartId);

  const session = await Stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: "payment",
    success_url: "http://localhost:3000/api/v1/payment/stripe/success",
    cancel_url: "http://localhost:5173/shopping-cart",
  });

  req.session.cartId = cartId;
  res.redirect(303, session.url);
});

router.use("/success", Success);

module.exports = router;
