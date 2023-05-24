const { CategoryAttribute } = require("../../database/models");

async function FindAllCategoryAttributesWithCategoryId(categoryId) {
  const categoryAttributes = await CategoryAttribute.findAll({
    where: {
      category_id: categoryId,
    },
  });
  return categoryAttributes;
}

module.exports = { FindAllCategoryAttributesWithCategoryId };
