const {Category, ProductCategory, Product} = require("../../database/models");

async function FindAllCategories(){
    const categories = await Category.findAll({
      where:{
        parent_category:null
      },
    });
      return categories;
    }

async function FindSubcategoryWithCategoryId(id){
  const subcategories = await Category.findAll({
    where:{
      parent_category: id
    },
  });
  return subcategories
}

async function FindProductsWithSubcategoryId(id){
  const products = await Product.findAll({
    include:[
      {
        model: ProductCategory,
        where: {category_id: id},
        required: true
      }
    ]
  });

  return products
}
module.exports = {FindAllCategories, FindSubcategoryWithCategoryId, FindProductsWithSubcategoryId};