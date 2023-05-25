const { Category } = require("../../database/models");
const { Op } = require("sequelize");

async function FindAllCategories() {
  const categories = await Category.findAll();
  return categories;
  // const categories = await Category.findAll({
  //   where: {
  //     parent_category: null,
  //   },
  // });
  // const sortedCategories = categories.sort((a, b) => {
  //   const nameA = a.name.toLowerCase();
  //   const nameB = b.name.toLowerCase();
  //   if (nameA < nameB) {
  //     return -1;
  //   }
  //   if (nameA > nameB) {
  //     return 1;
  //   }
  //   return 0;
  // });
  // return sortedCategories;
}

async function FindCategoryWithId(id) {
  const category = await Category.findOne({
    where: {
      id: id,
    },
  });
  return category;
}

async function FindCategoryWithName(name) {
  const category = await Category.findOne({
    where: {
      name: name,
    },
  });
  return category;
}

async function FindAllCategoriesWithParentCategoryId(id) {
  const categories = await Category.findAll({
    where: {
      parent_category: id,
    },
  });
  return categories;
}

async function FindAllCategoriesWithoutParentCategory() {
  const categories = await Category.findAll({
    where: {
      parent_category: { [Op.is]: null },
    },
  });
  return categories;
}

module.exports = {
  FindAllCategories,
  FindCategoryWithId,
  FindCategoryWithName,
  FindAllCategoriesWithParentCategoryId,
  FindAllCategoriesWithoutParentCategory,
};
