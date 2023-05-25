const express = require("express");

const ProductionUnit = require("./ProductionUnit/ProductionUnit.get");

const {
  FindAllProductCategories,
  FindAllCategoriesIdsWithProductId,
  FindAllProductsIdsWithCategoryId,
} = require("../../../../controllers/ProductCategory/findProductCategory");

const {
  FindAllProducts,
  FindProductWithId,
  FindProductWithName,
  FindProductWithBarcode,
  FindAllProductsWithProducerId,
} = require("../../../../controllers/Product/findProducts");

const router = express.Router();

router.get("/", (req, res) => {
  FindAllProducts().then((products) => {
    if (products) {
      res.status(200).json(products);
    } else {
      res.status(404).send("Products not found");
    }
  });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  FindProductWithId(id).then((product) => {
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).send("Product not found");
    }
  });
});

// Nota:
// JOAO: Tenho que falar com o FELIPE sobre este endpoint
router.get("/subcategory/:id", (req, res) => {
  const id = req.params.id;
  FindAllProductsIdsWithCategoryId(id).then((products) => {
    if (products) {
      res.status(200).json(products);
    } else {
      res.status(404).send("No products found for that category");
    }
  });
});

router.use("/:id/productionUnits", ProductionUnit);

module.exports = router;
