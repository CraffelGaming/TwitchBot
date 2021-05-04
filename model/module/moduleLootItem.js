const { DataTypes, Model } = require('sequelize');
const items = require('./moduleLootItem.json');

class ModuleLootItem {
    constructor(){
        this.handle = 0;
        this.name = "";
        this.minutes = 0;
        this.help = "";
        this.stealTimeout = 0;
    }

    static initialize(sequelize){
        sequelize.define('module_loot', {
            handle: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
             },
             minutes: {
                type: DataTypes.DECIMAL,
                allowNull: false,
                defaultValue: 0
            },
            help: {
                type: DataTypes.STRING,
                allowNull: true
            },
            stealTimeout: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 15
            }
          }, {freezeTableName: true});
    }

    static async fill(sequelize){
        for(var item of Object.values(items)){
            await sequelize.models.module_loot.create(item);
        }
    }
}
module.exports = ModuleLootItem