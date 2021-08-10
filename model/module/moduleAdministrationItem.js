const { DataTypes, Model } = require('sequelize');
const items = require('./moduleAdministrationItem.json');

class ModuleAdministrationItem {
    constructor(){
        this.handle = 0;
        this.name = "";
        this.minutes = 0;
        this.help = "";
        this.isActive = true;
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
            },
            isActive: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true
            }
          }, {freezeTableName: true});
    }

    static async fill(sequelize){
        for(var item of Object.values(items))
            if(await sequelize.models.module_administration.count({ where: { name: item.name } }) == 0)
                await sequelize.models.module_administration.create(item);
    }
}
module.exports = ModuleAdministrationItem