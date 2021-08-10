'use strict';

const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'module_donate',
        'isActive',
        {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false
        },
      ),
      queryInterface.addColumn(
        'module_help',
        'isActive',
        {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false
        },
      ),
      queryInterface.addColumn(
        'module_key',
        'isActive',
        {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false
        },
      ),
      queryInterface.addColumn(
        'module_loot',
        'isActive',
        {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false
        },
      ),
      queryInterface.addColumn(
        'module_time',
        'isActive',
        {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false
        },
      ),
      queryInterface.addColumn(
        'module_administration',
        'isActive',
        {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true
        },
      )
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('module_donate', 'isActive'),
      queryInterface.removeColumn('module_help', 'isActive'),
      queryInterface.removeColumn('module_key', 'isActive'),
      queryInterface.removeColumn('module_loot', 'isActive'),
      queryInterface.removeColumn('module_time', 'isActive'),
      queryInterface.removeColumn('module_administration', 'isActive')
    ]);
  }
};
