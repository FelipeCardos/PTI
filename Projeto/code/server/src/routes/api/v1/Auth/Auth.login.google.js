const express = require('express');
const passport = require("passport");
const router = express.Router();
const {test} = require('../../../../middleware/test');

router.get("/login", passport.authenticate("google", { session: false ,scope: ["profile", "email"]}));



router.get(
    "/callback",
    passport.authenticate("google", {
      failureMessage: "Cannot login to Google, please try again later!",
      failureRedirect: "http://localhost:3000/api/v1/555555",
      successRedirect: "http://localhost:3000/api/v1/",
    }),(req, res) => {
      res.send("Thank you for signing in!");
    }
  );
  
  module.exports = router;