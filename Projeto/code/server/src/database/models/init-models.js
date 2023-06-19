var DataTypes = require("sequelize").DataTypes;
var _Address = require("./Address");
var _Cart = require("./Cart");
var _CartLine = require("./CartLine");
var _Category = require("./Category");
var _CategoryAttribute = require("./CategoryAttribute");
var _Credentials = require("./Credentials");
var _Notification = require("./Notification");
var _Product = require("./Product");
var _ProductAttribute = require("./ProductAttribute");
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
  var Credentials = _Credentials(sequelize, DataTypes);
  var Notification = _Notification(sequelize, DataTypes);
  var Product = _Product(sequelize, DataTypes);
  var ProductAttribute = _ProductAttribute(sequelize, DataTypes);
  var ProductCategory = _ProductCategory(sequelize, DataTypes);
  var ProductImage = _ProductImage(sequelize, DataTypes);
  var ProductProductionUnit = _ProductProductionUnit(sequelize, DataTypes);
  var ProductionUnit = _ProductionUnit(sequelize, DataTypes);
  var Rating = _Rating(sequelize, DataTypes);
  var User = _User(sequelize, DataTypes);
  var Vehicle = _Vehicle(sequelize, DataTypes);
  var Wishlist = _Wishlist(sequelize, DataTypes);

  Cart.belongsToMany(Product, { as: 'product_id_Products', through: CartLine, foreignKey: "cart_id", otherKey: "product_id" });
  Product.belongsToMany(Cart, { as: 'cart_id_Carts', through: CartLine, foreignKey: "product_id", otherKey: "cart_id" });
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
  CartLine.belongsTo(Product, { as: "product", foreignKey: "product_id"});
  Product.hasMany(CartLine, { as: "CartLines", foreignKey: "product_id"});
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
  Vehicle.belongsTo(ProductionUnit, { as: "production_unit", foreignKey: "production_unit_id"});
  ProductionUnit.hasMany(Vehicle, { as: "Vehicles", foreignKey: "production_unit_id"});
  Cart.belongsTo(User, { as: "consumer", foreignKey: "consumer_id"});
  User.hasMany(Cart, { as: "Carts", foreignKey: "consumer_id"});
  Credentials.belongsTo(User, { as: "user", foreignKey: "user_id"});
  User.hasOne(Credentials, { as: "Credential", foreignKey: "user_id"});
  Notification.belongsTo(User, { as: "user", foreignKey: "user_id"});
  User.hasMany(Notification, { as: "Notifications", foreignKey: "user_id"});
  Product.belongsTo(User, { as: "producer", foreignKey: "producer_id"});
  User.hasMany(Product, { as: "Products", foreignKey: "producer_id"});
  ProductionUnit.belongsTo(User, { as: "producer", foreignKey: "producer_id"});
  User.hasMany(ProductionUnit, { as: "ProductionUnits", foreignKey: "producer_id"});
  Rating.belongsTo(User, { as: "consumer", foreignKey: "consumer_id"});
  User.hasMany(Rating, { as: "Ratings", foreignKey: "consumer_id"});
  Vehicle.belongsTo(User, { as: "producer", foreignKey: "producer_id"});
  User.hasMany(Vehicle, { as: "Vehicles", foreignKey: "producer_id"});
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
    Credentials,
    Notification,
    Product,
    ProductAttribute,
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
