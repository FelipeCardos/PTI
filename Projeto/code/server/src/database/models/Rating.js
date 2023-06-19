const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Rating', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    consumer_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    producer_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    product_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    rating: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Rating',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "consumer_id",
        using: "BTREE",
        fields: [
          { name: "consumer_id" },
        ]
      },
    ]
  });
};
