const { DataTypes, Model } = require('sequelize');
const items = require('./moduleHelpItem.json');

class ModuleHelpItem {
    constructor(){
        this.handle = 0;
        this.name = "";
        this.minutes = 0;
        this.help = "";
    }

    static initialize(sequelize){
        sequelize.define('module_help', {
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
            }
          }, {freezeTableName: true});
    }

    static async fill(sequelize){
        for(var item of Object.values(items)){
            await sequelize.models.module_help.create(item);
        }
    }
}
module.exports = ModuleHelpItem