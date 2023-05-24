const express = require("express");

const {
  FindAllCategories,
  FindCategoryWithId,
  FindCategoryWithName,
  FindAllCategoriesWithParentCategoryId,
  FindAllCategoriesWithoutParentCategory,
} = require("../../../../controllers/Category/findCategory");

const router = express.Router();

router.get("/", async (req, res) => {
  const categories = await FindAllCategories();
  if (!categories) return res.status(404).send("Categories not found");

  for (let category of categories) {
    const subcategories = await FindAllCategoriesWithParentCategoryId(
      category.dataValues.id
    );
    category.dataValues.subcategories =
      subcategories.length > 0 ? subcategories : [];
  }
  res.status(200).json(categories);
});

router.get("/:id", async (req, res) => {
  let category = await FindCategoryWithId(req.params.id);
  if (!category) return res.status(404).send("Category not found");

  const subcategories = await FindAllCategoriesWithParentCategoryId(
    category.dataValues.id
  );
  category.dataValues.subcategories =
    subcategories.length > 0 ? subcategories : [];
  res.status(200).json(category);
});

module.exports = router;
