const {Category, ProductCategory, Product} = require("../../database/models");

async function FindAllCategories(){
    const categories = await Category.findAll({
      where:{
        parent_category:null
      },
    });
    const sortedCategories = categories.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
      return sortedCategories;
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