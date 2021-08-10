const { DataTypes, Model } = require('sequelize');
const items = require('./moduleKeyItem.json');

class ModuleKeyItem {
    constructor(){
        this.handle = 0;
        this.name = "";
        this.minutes = 0;
        this.help = "";;
        this.isActive = false;
    }

    static initialize(sequelize){
        sequelize.define('module_key', {
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
                defaultValue: false
            }
          }, {freezeTableName: true});
    }

    static async fill(sequelize){
        for(var item of Object.values(items))
            if(await sequelize.models.module_loot.count({ where: { name: item.name } }) == 0)
                await sequelize.models.module_key.create(item);
    }
}
module.exports = ModuleKeyItem