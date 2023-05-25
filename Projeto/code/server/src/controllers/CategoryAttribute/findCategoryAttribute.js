const { CategoryAttribute } = require("../../database/models");

async function FindAllCategoryAttributesWithCategoryId(categoryId) {
  const categoryAttributes = await CategoryAttribute.findAll({
    where: {
      category_id: categoryId,
    },
  });
  return categoryAttributes;
}

async function FindCategoryAttributeWithId(id) {
  const categoryAttribute = await CategoryAttribute.findOne({
    where: {
      id: id,
    },
  });
  return categoryAttribute;
}

module.exports = {
  FindAllCategoryAttributesWithCategoryId,
  FindCategoryAttributeWithId,
};
