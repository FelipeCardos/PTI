const express = require("express");
const passport = require("passport");
const { checkAuthenticated, checkUsersIsProducer, checkUsersIsConsumer } = require("../../../../middleware/UserAuth");
const {GetCartCost} = require("../../../../controllers/Cart/getCartCost");

const router = express.Router();
// passport.authenticate("jwt", { session: false })

router.get("/",  (req, res) => {
    GetCartCost(1).then((cartCost) => {
        console.log(cartCost);
        res.status(200).json({cartCost: cartCost});
    });


});
  
module.exports = router;