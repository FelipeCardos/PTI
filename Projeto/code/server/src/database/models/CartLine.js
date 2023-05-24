const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('CartLine', {
    cart_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Cart',
        key: 'id'
      }
    },
    product_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Product',
        key: 'id'
      }
    },
    status: {
      type: DataTypes.ENUM('OPEN','PROCESSING','AWAITING_TRANSPORT','TRANSPORT_IMMINENT','IN_TRANSIT','LAST_KM','COMPLETE','FAILURE','CANCELLED'),
      allowNull: false
    },
    vehicle_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: 'Vehicle',
        key: 'id'
      }
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    delivery_date: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'CartLine',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "cart_id" },
          { name: "product_id" },
        ]
      },
      {
        name: "product_id",
        using: "BTREE",
        fields: [
          { name: "product_id" },
        ]
      },
      {
        name: "vehicle_id",
        using: "BTREE",
        fields: [
          { name: "vehicle_id" },
        ]
      },
    ]
  });
};
