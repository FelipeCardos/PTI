const { CategoryAttribute } = require("../../database/models");

async function CreateCategoryAttribute(categoryId, title) {
  const categoryAttribute = await CategoryAttribute.create({
    category_id: categoryId,
    title: title,
  });
  return categoryAttribute;
}

module.exports = { CreateCategoryAttribute };
