var DataTypes = require("sequelize").DataTypes;
var _Address = require("./Address");
var _Cart = require("./Cart");
var _CartLine = require("./CartLine");
var _Category = require("./Category");
var _CategoryAttribute = require("./CategoryAttribute");
var _Comment = require("./Comment");
var _ConsumerVote = require("./ConsumerVote");
var _Credentials = require("./Credentials");
var _Product = require("./Product");
var _ProductCategory = require("./ProductCategory");
var _ProductImage = require("./ProductImage");
var _ProductProductionUnit = require("./ProductProductionUnit");
var _ProductionUnit = require("./ProductionUnit");
var _Rating = require("./Rating");
var _User = require("./User");
var _Vehicle = require("./Vehicle");
var _Wishlist = require("./Wishlist");

function initModels(sequelize) {
  var Address = _Address(sequelize, DataTypes);
  var Cart = _Cart(sequelize, DataTypes);
  var CartLine = _CartLine(sequelize, DataTypes);
  var Category = _Category(sequelize, DataTypes);
  var CategoryAttribute = _CategoryAttribute(sequelize, DataTypes);
  var Comment = _Comment(sequelize, DataTypes);
  var ConsumerVote = _ConsumerVote(sequelize, DataTypes);
  var Credentials = _Credentials(sequelize, DataTypes);
  var Product = _Product(sequelize, DataTypes);
  var ProductCategory = _ProductCategory(sequelize, DataTypes);
  var ProductImage = _ProductImage(sequelize, DataTypes);
  var ProductProductionUnit = _ProductProductionUnit(sequelize, DataTypes);
  var ProductionUnit = _ProductionUnit(sequelize, DataTypes);
  var Rating = _Rating(sequelize, DataTypes);
  var User = _User(sequelize, DataTypes);
  var Vehicle = _Vehicle(sequelize, DataTypes);
  var Wishlist = _Wishlist(sequelize, DataTypes);

  Cart.belongsToMany(Product, { as: 'product_id_Products', through: CartLine, foreignKey: "cart_id", otherKey: "product_id" });
  Comment.belongsToMany(User, { as: 'consumer_id_Users', through: ConsumerVote, foreignKey: "comment_id", otherKey: "consumer_id" });
  Product.belongsToMany(Cart, { as: 'cart_id_Carts', through: CartLine, foreignKey: "product_id", otherKey: "cart_id" });
  Product.belongsToMany(ProductionUnit, { as: 'production_unit_id_ProductionUnits', through: ProductProductionUnit, foreignKey: "product_id", otherKey: "production_unit_id" });
  ProductionUnit.belongsToMany(Product, { as: 'product_id_Product_ProductProductionUnits', through: ProductProductionUnit, foreignKey: "production_unit_id", otherKey: "product_id" });
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
  Comment.belongsTo(Comment, { as: "parent_comment_Comment", foreignKey: "parent_comment"});
  Comment.hasMany(Comment, { as: "Comments", foreignKey: "parent_comment"});
  ConsumerVote.belongsTo(Comment, { as: "comment", foreignKey: "comment_id"});
  Comment.hasMany(ConsumerVote, { as: "ConsumerVotes", foreignKey: "comment_id"});
  CartLine.belongsTo(Product, { as: "product", foreignKey: "product_id"});
  Product.hasMany(CartLine, { as: "CartLines", foreignKey: "product_id"});
  Comment.belongsTo(Product, { as: "product", foreignKey: "product_id"});
  Product.hasMany(Comment, { as: "Comments", foreignKey: "product_id"});
  ProductCategory.belongsTo(Product, { as: "product", foreignKey: "product_id"});
  Product.hasMany(ProductCategory, { as: "ProductCategories", foreignKey: "product_id"});
  ProductImage.belongsTo(Product, { as: "product", foreignKey: "product_id"});
  Product.hasMany(ProductImage, { as: "ProductImages", foreignKey: "product_id"});
  ProductProductionUnit.belongsTo(Product, { as: "product", foreignKey: "product_id"});
  Product.hasMany(ProductProductionUnit, { as: "ProductProductionUnits", foreignKey: "product_id"});
  Rating.belongsTo(Product, { as: "product", foreignKey: "product_id"});
  Product.hasMany(Rating, { as: "Ratings", foreignKey: "product_id"});
  Wishlist.belongsTo(Product, { as: "product", foreignKey: "product_id"});
  Product.hasMany(Wishlist, { as: "Wishlists", foreignKey: "product_id"});
  ProductProductionUnit.belongsTo(ProductionUnit, { as: "production_unit", foreignKey: "production_unit_id"});
  ProductionUnit.hasMany(ProductProductionUnit, { as: "ProductProductionUnits", foreignKey: "production_unit_id"});
  Vehicle.belongsTo(ProductionUnit, { as: "production_unit", foreignKey: "production_unit_id"});
  ProductionUnit.hasMany(Vehicle, { as: "Vehicles", foreignKey: "production_unit_id"});
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
  Rating.belongsTo(User, { as: "producer", foreignKey: "producer_id"});
  User.hasMany(Rating, { as: "producer_Ratings", foreignKey: "producer_id"});
  Wishlist.belongsTo(User, { as: "consumer", foreignKey: "consumer_id"});
  User.hasMany(Wishlist, { as: "Wishlists", foreignKey: "consumer_id"});
  CartLine.belongsTo(Vehicle, { as: "vehicle", foreignKey: "vehicle_id"});
  Vehicle.hasMany(CartLine, { as: "CartLines", foreignKey: "vehicle_id"});

  return {
    Address,
    Cart,
    CartLine,
    Category,
    CategoryAttribute,
    Comment,
    ConsumerVote,
    Credentials,
    Product,
    ProductCategory,
    ProductImage,
    ProductProductionUnit,
    ProductionUnit,
    Rating,
    User,
    Vehicle,
    Wishlist,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
