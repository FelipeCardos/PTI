const { Category } = require("../../database/models");

async function CreateCategory(name, parent_category) {
  const category = await Category.create({
    name: name,
    parent_category: parent_category,
  });
  return category;
}
module.exports = {
  CreateCategory,
};
