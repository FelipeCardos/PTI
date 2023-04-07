const express = require("express");
const { isUserAuthenticated } = require("../../../../middleware/IsUserAuth");

const router = express.Router();

router.get("/", isUserAuthenticated, (req, res) => {
    res.send("Hello World!");
});
  
module.exports = router;