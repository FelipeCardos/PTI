const { Product, ProductCategory } = require("../../database/models");

async function FindProductsIdWithCategoryId(id){
    const productsCategory = await ProductCategory.findAll({
        where:{
          category_id: id
          
        },
        attributes: { exclude: ['id'] }
      });
      return productsCategory
}



module.exports = {FindProductsIdWithCategoryId}
