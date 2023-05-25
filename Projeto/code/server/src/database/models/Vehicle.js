const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Vehicle', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    production_unit_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: 'ProductionUnit',
        key: 'id'
      }
    },
    producer_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    license_plate: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    capacity: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Vehicle',
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
        name: "producer_id",
        using: "BTREE",
        fields: [
          { name: "producer_id" },
        ]
      },
      {
        name: "production_unit_id",
        using: "BTREE",
        fields: [
          { name: "production_unit_id" },
        ]
      },
    ]
  });
};
