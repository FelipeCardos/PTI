const express = require('express');
const passport = require("passport");
const router = express.Router();

router.get("/login", passport.authenticate("google", { scope: ["profile", "email"] }));



router.get(
    "/callback",
    passport.authenticate("google", {
      failureMessage: "Cannot login to Google, please try again later!",
    //   failureRedirect: errorLoginUrl,
    //   successRedirect: successLoginUrl,
    }),(req, res) => {
      console.log("User: ", req.user);
      res.send("Thank you for signing in!");
    }
  );
  
  module.exports = router;