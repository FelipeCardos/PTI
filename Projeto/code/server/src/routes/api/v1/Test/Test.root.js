const express = require("express");

const {
  CreateCategory,
} = require("../../../../controllers/Category/createCategory");

const router = express.Router();

router.get("/", async (req, res) => {
  await CreateCategory("boa tarde").then((result) => {
    res.send(result);
  });
});

module.exports = router;
