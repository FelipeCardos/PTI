const express = require("express");

const {
  FindProductsIdWithCategoryId,

} = require("../../../../controllers/ProductCategory/findProductCategory");



const {
  FindAllProducts,
  FindProductWithId,
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

router.get("/subcategory/:id",(req,res) =>{
  const id = req.params.id;
  FindProductsIdWithCategoryId(id).then((products)=>{
    if(products){
      res.status(200).json(products);
    }
    else{
      res.status(404).send("No products found for that category");
    }
  })
})

module.exports = router;
