const express = require("express");
const passport = require("passport");
const {
  checkAuthenticated,
  checkUsersIsProducer,
  checkUsersIsConsumer,
} = require("../../../../middleware/UserAuth");
const { GetCartCost } = require("../../../../controllers/Cart/getCartCost");

const router = express.Router();
// passport.authenticate("jwt", { session: false })

router.get("/", checkAuthenticated, (req, res) => {
  // GetCartCost(1).then((cartCost) => {
  //     console.log(cartCost);
  //     res.status(200).json({cartCost: cartCost});
  // });
  let user = req.user;
  console.log(
    "-------------------------------------------------------------------"
  );
  console.log(user);
  res.send("Hello World");
});

module.exports = router;
