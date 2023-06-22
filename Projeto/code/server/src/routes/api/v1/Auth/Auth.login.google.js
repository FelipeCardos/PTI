const express = require("express");
const passport = require("passport");
const router = express.Router();
const { test } = require("../../../../middleware/test");

router.get(
  "/login",
  (req, res, next) => {
    req.session.isProducer = req.query.isProducer;
    next();
  },
  passport.authenticate("google", {
    session: false,
    scope: ["profile", "email"],
  })
);

router.get(
  "/callback",
  passport.authenticate("google", {
    failureMessage: "Cannot login to Google, please try again later!",
    failureRedirect: "http://yourlocalshop.pt:3000/api/v1/555555",
    successRedirect: "http://yourlocalshop.pt:5173/",
  }),
  (req, res) => {
    res.send("Thank you for signing in!");
  }
);

module.exports = router;
