'use strict';

const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'loot_hero',
        'lastBlood',
        {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Date.UTC(2020, 1, 1)
        },
      ),
      queryInterface.addColumn(
        'module_loot',
        'bloodTimeout',
        {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 30
        },
      )
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('loot_hero', 'lastBlood'),
      queryInterface.removeColumn('module_loot', 'bloodTimeout')
    ]);
  }
};
