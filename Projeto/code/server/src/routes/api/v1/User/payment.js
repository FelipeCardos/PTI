const express = require("express");
const passport = require("passport");
const { checkAuthenticated, checkUsersIsProducer, checkUsersIsConsumer } = require("../../../../middleware/UserAuth");

const router = express.Router();
// passport.authenticate("jwt", { session: false })

router.get("/", checkAuthenticated, checkUsersIsProducer,  (req, res) => {

    res.json({ message: req.user.typeUser});
});
  
module.exports = router;