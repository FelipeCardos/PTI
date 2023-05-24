var DataTypes = require("sequelize").DataTypes;

function initModels(sequelize) {

  Cart.belongsToMany(Product, { as: 'product_id_Products', through: CartLine, foreignKey: "cart_id", otherKey: "product_id" });
  CategoryAttribute.belongsToMany(Product, { as: 'product_id_Product_ProductAttributes', through: ProductAttribute, foreignKey: "attribute_id", otherKey: "product_id" });
  Comment.belongsToMany(User, { as: 'consumer_id_Users', through: ConsumerVote, foreignKey: "comment_id", otherKey: "consumer_id" });
  Product.belongsToMany(Cart, { as: 'cart_id_Carts', through: CartLine, foreignKey: "product_id", otherKey: "cart_id" });
  Product.belongsToMany(CategoryAttribute, { as: 'attribute_id_CategoryAttributes', through: ProductAttribute, foreignKey: "product_id", otherKey: "attribute_id" });
  User.belongsToMany(Comment, { as: 'comment_id_Comments', through: ConsumerVote, foreignKey: "consumer_id", otherKey: "comment_id" });
  ProductionUnit.belongsTo(Address, { as: "address", foreignKey: "address_id"});
  Address.hasMany(ProductionUnit, { as: "ProductionUnits", foreignKey: "address_id"});
  User.belongsTo(Address, { as: "address", foreignKey: "address_id"});
  Address.hasMany(User, { as: "Users", foreignKey: "address_id"});
  CartLine.belongsTo(Cart, { as: "cart", foreignKey: "cart_id"});
  Cart.hasMany(CartLine, { as: "CartLines", foreignKey: "cart_id"});
  Category.belongsTo(Category, { as: "parent_category_Category", foreignKey: "parent_category"});
  Category.hasMany(Category, { as: "Categories", foreignKey: "parent_category"});
  CategoryAttribute.belongsTo(Category, { as: "category", foreignKey: "category_id"});
  Category.hasMany(CategoryAttribute, { as: "CategoryAttributes", foreignKey: "category_id"});
  ProductCategory.belongsTo(Category, { as: "category", foreignKey: "category_id"});
  Category.hasMany(ProductCategory, { as: "ProductCategories", foreignKey: "category_id"});
  ProductAttribute.belongsTo(CategoryAttribute, { as: "attribute", foreignKey: "attribute_id"});
  CategoryAttribute.hasMany(ProductAttribute, { as: "ProductAttributes", foreignKey: "attribute_id"});
  Comment.belongsTo(Comment, { as: "parent_comment_Comment", foreignKey: "parent_comment"});
  Comment.hasMany(Comment, { as: "Comments", foreignKey: "parent_comment"});
  ConsumerVote.belongsTo(Comment, { as: "comment", foreignKey: "comment_id"});
  Comment.hasMany(ConsumerVote, { as: "ConsumerVotes", foreignKey: "comment_id"});
  CartLine.belongsTo(Product, { as: "product", foreignKey: "product_id"});
  Product.hasMany(CartLine, { as: "CartLines", foreignKey: "product_id"});
  Comment.belongsTo(Product, { as: "product", foreignKey: "product_id"});
  Product.hasMany(Comment, { as: "Comments", foreignKey: "product_id"});
  ProductAttribute.belongsTo(Product, { as: "product", foreignKey: "product_id"});
  Product.hasMany(ProductAttribute, { as: "ProductAttributes", foreignKey: "product_id"});
  ProductCategory.belongsTo(Product, { as: "product", foreignKey: "product_id"});
  Product.hasMany(ProductCategory, { as: "ProductCategories", foreignKey: "product_id"});
  ProductImage.belongsTo(Product, { as: "product", foreignKey: "product_id"});
  Product.hasMany(ProductImage, { as: "ProductImages", foreignKey: "product_id"});
  ProductProductionUnit.belongsTo(Product, { as: "product", foreignKey: "product_id"});
  Product.hasMany(ProductProductionUnit, { as: "ProductProductionUnits", foreignKey: "product_id"});
  Wishlist.belongsTo(Product, { as: "product", foreignKey: "product_id"});
  Product.hasMany(Wishlist, { as: "Wishlists", foreignKey: "product_id"});
  Cart.belongsTo(User, { as: "consumer", foreignKey: "consumer_id"});
  User.hasMany(Cart, { as: "Carts", foreignKey: "consumer_id"});
  Comment.belongsTo(User, { as: "user", foreignKey: "user_id"});
  User.hasMany(Comment, { as: "Comments", foreignKey: "user_id"});
  ConsumerVote.belongsTo(User, { as: "consumer", foreignKey: "consumer_id"});
  User.hasMany(ConsumerVote, { as: "ConsumerVotes", foreignKey: "consumer_id"});
  Credentials.belongsTo(User, { as: "user", foreignKey: "user_id"});
  User.hasOne(Credentials, { as: "Credential", foreignKey: "user_id"});
  Product.belongsTo(User, { as: "producer", foreignKey: "producer_id"});
  User.hasMany(Product, { as: "Products", foreignKey: "producer_id"});
  Rating.belongsTo(User, { as: "consumer", foreignKey: "consumer_id"});
  User.hasMany(Rating, { as: "Ratings", foreignKey: "consumer_id"});
  Vehicle.belongsTo(User, { as: "producer", foreignKey: "producer_id"});
  User.hasMany(Vehicle, { as: "Vehicles", foreignKey: "producer_id"});
  Wishlist.belongsTo(User, { as: "consumer", foreignKey: "consumer_id"});
  User.hasMany(Wishlist, { as: "Wishlists", foreignKey: "consumer_id"});
  CartLine.belongsTo(Vehicle, { as: "vehicle", foreignKey: "vehicle_id"});
  Vehicle.hasMany(CartLine, { as: "CartLines", foreignKey: "vehicle_id"});

  return {
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
