const express = require("express");

const ProductionUnit = require("./ProductionUnit/ProductionUnit.get");
const CartLine = require("./CartLine/CartLine.get");
const ProductImage = require("./ProductImage/ProductImage.get");
const Rating = require("./Rating/Rating.get");
const Comment = require("./Comment/Comment.get");
const Wishlist = require("./Wishlist/Wishlist.get");
const ProductAttribute = require("./ProductAttribute/ProductAttribute.get");

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

const{
  FindAllRatingsWithProductId,
} = require("../../../../controllers/Rating/findRating")

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

router.get("/search/:str",(req,res) =>{
  const search = req.params.str;
  FindProductWithName(search).then((products) => {
    if(products) res.status(200).json(products);
    else res.status(404).send("No products with "+ search + " found")
  });
});

router.get("/producer/:id",(req,res) =>{
  const idProducer = req.params.id;
  FindAllProductsWithProducerId(idProducer).then((products) => {
    if(products) res.status(200).json(products);
    else res.status(404).send("No products with producer id: " + idProducer);
  });
});

router.get("/rates/:id", (req,res) =>{
  const idProduct = req.params.id;
  FindAllRatingsWithProductId(idProduct).then((products) =>{
    if(products) res.status(200).json(products);
    else res.status(404).send("Not found");
  });
});


router.use("/:id/productionUnits", ProductionUnit);
router.use("/:id/cartLines", CartLine);
router.use("/:id/productImages", ProductImage);
router.use("/:id/ratings", Rating);
router.use("/:id/comments", Comment);
router.use("/:id/wishlists", Wishlist);
router.use("/:id/productAttributes", ProductAttribute);

module.exports = router;
