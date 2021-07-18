'use strict';

const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'loot_object',
        'type',
        {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0
        },
      )
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('loot_object', 'type')
    ]);
  }
};
