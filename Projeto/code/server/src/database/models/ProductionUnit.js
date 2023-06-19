const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ProductionUnit', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    producer_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    capacity: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    address_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: 'Address',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'ProductionUnit',
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
        name: "id",
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "address_id",
        using: "BTREE",
        fields: [
          { name: "address_id" },
        ]
      },
      {
        name: "producer_id",
        using: "BTREE",
        fields: [
          { name: "producer_id" },
        ]
      },
    ]
  });
};
