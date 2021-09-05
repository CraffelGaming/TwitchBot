'use strict';

const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'loot_hero',
        'lastJoin',
        {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Date.UTC(2020, 1, 1)
        },
      ),
      queryInterface.addColumn(
        'module_loot',
        'joinTimeout',
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
      queryInterface.removeColumn('loot_hero', 'lastJoin'),
      queryInterface.removeColumn('module_loot', 'joinTimeout')
    ]);
  }
};
