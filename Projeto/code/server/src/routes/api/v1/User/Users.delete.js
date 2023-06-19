const express = require("express");

const Product = require("./Product/Product.delete");

const { DeleteUserWithId } = require("../../../../controllers/User/deleteUser");

const router = express.Router();

router.delete("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const deletionResult = await DeleteUserWithId(userId);
    if (deletionResult.success) {
      res.status(200).send({ message: "User deleted successfully" });
    } else {
      res.status(404).send({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).send({ message: "Error deleting user" });
  }
});

router.use("/:id/products", Product);

module.exports = router;
