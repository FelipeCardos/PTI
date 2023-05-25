const express = require("express");

const {
  FindAllCategories,
  FindCategoryWithId,
  FindCategoryWithName,
  FindAllCategoriesWithParentCategoryId,
  FindAllCategoriesWithoutParentCategory,
} = require("../../../../../controllers/Category/findCategory");

const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  const parentCategoryId = req.params.id;
  const categories = await FindAllCategoriesWithParentCategoryId(
    parentCategoryId
  );
  res.send(categories);
});

module.exports = router;
