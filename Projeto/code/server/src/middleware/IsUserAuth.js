const passport = require("passport");

module.exports.isUserAuthenticated = (req, res, next) => {
    if (req.user||passport.authenticate("jwt", { session: false })) {
      next();
    } else {
      res.status(401).send("You must login first!");
    }
  };