'use strict';

const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'command',
        'isAdmin',
        {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false
        },
      )
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('command', 'isAdmin')
    ]);
  }
};
