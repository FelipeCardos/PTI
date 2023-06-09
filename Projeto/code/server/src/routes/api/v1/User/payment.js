const express = require("express");
const passport = require("passport");


const {getCoordinatesFromUserAndProduct, calculatedistance} = require('../../../../controllers/Maps/map');

const router = express.Router();
// passport.authenticate("jwt", { session: false })

router.get("/", async (req, res) => {
  const x  =  await getCoordinatesFromUserAndProduct(1, 1);
    const y = await calculatedistance(x[0], x[1], x[2], x[3]);
    res.json(y);
});

module.exports = router;
