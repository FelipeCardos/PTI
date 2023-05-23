const express = require("express");
const {
  CreateCartLine,
} = require("../../../../controllers/CartLine/createCartline");

const router = express.Router();

router.get("/", async (req, res) => {
  console.log("testar criar uma cartline");
  await CreateCartLine(1, 3, 3).then((cartline) => {
    res.send(cartline);
  });
});

module.exports = router;
