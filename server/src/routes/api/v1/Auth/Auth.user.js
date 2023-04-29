const express = require("express");
const router = express.Router();
const { checkAuthenticated } = require("../../../../middleware/UserAuth");

// import routes
router.get("/", checkAuthenticated, (req, res) => {
  res.status(200).json({ user: req.user });
});

module.exports = router;
