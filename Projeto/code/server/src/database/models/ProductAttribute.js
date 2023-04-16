const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ProductAttribute', {
    product_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Product',
        key: 'id'
      }
    },
    attribute_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'CategoryAttribute',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'ProductAttribute',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "product_id" },
          { name: "attribute_id" },
        ]
      },
      {
        name: "attribute_id",
        using: "BTREE",
        fields: [
          { name: "attribute_id" },
        ]
      },
    ]
  });
};
