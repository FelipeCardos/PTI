const express = require("express");

const CategoryAttribute = require("./CategoryAttribute/CategoryAttributes.get");
const Product = require("./Product/Product.get");
const Subcategories = require("./Subcategories/Subcategories.get");

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
router.get("/search/:str", async(req,res)=>{
  let categories = await FindCategoryWithName(req.params.str);
  if (!categories) return res.status(404).send("Category not found");
  res.status(200).json(categories);
})

router.use("/:id/categoryAttributes", CategoryAttribute);
router.use("/:id/products", Product);
router.use("/:id/subcategories", Subcategories);

module.exports = router;
