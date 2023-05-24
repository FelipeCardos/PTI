const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Cart', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    consumer_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    order_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    delivery_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('OPEN','AWAITING_PAYMENT','PROCESSING','CANCELLED','COMPLETE','FAILURE'),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Cart',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
          { name: "consumer_id" },
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
