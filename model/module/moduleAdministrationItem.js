const { DataTypes, Model } = require('sequelize');
const items = require('./moduleAdministrationItem.json');

class ModuleAdministrationItem {
    constructor(){
        this.handle = 0;
        this.name = "";
        this.minutes = 0;
        this.help = "";
    }

    static initialize(sequelize){
        sequelize.define('module_administration', {
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
            await sequelize.models.module_administration.create(item);
        }
    }
}
module.exports = ModuleAdministrationItem