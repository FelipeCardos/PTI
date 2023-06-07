const express = require("express");

const Product = require("./Product/Product.delete");

const { DeleteUserWithId } = require("../../../../controllers/User/deleteUser");

const router = express.Router();

router.delete("/:id", async (req, res) => {
  const userId = req.params.id;
  const user = await DeleteUserWithId(userId);
  res.send(user);
});

router.use("/:id/products", Product);

module.exports = router;
