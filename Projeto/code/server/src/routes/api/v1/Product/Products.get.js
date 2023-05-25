const express = require("express");

const ProductionUnit = require("./ProductionUnit/ProductionUnit.get");
const CartLine = require("./CartLine/CartLine.get");
const ProductImage = require("./ProductImage/ProductImage.get");
const Rating = require("./Rating/Rating.get");

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
router.use("/:id/cartLines", CartLine);
router.use("/:id/productImages", ProductImage);
router.use("/:id/ratings", Rating);

module.exports = router;
