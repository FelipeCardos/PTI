const express = require("express");

const {
  FindAllCategoryAttributesWithCategoryId,
} = require("../../../../../controllers/CategoryAttribute/findCategoryAttribute");

const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  const categoryId = req.params.id;
  const categoryAttributes = await FindAllCategoryAttributesWithCategoryId(
    categoryId
  );
  res.status(200).json(categoryAttributes);
});

module.exports = router;
