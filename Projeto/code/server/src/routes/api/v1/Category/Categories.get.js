const express = require("express");

const {
  FindAllCategories,
  FindAllCategoriesWithParentCategoryId,
} = require("../../../../controllers/Category/findCategory");

const router = express.Router();

router.get("/", (req, res) => {
  FindAllCategories().then((categories) => {
    if (categories) {
      res.status(200).json(categories);
    } else {
      res.status(404).send("Categories not found");
    }
  });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  FindAllCategoriesWithParentCategoryId(id).then((subcategory) => {
    if (subcategory) {
      res.status(200).json(subcategory);
    } else {
      res.status(404).send("Subcategory not found");
    }
  });
});

module.exports = router;
