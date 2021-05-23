const { DataTypes, Model } = require('sequelize');
const items = require('./moduleSupportItem.json');

class ModuleSupportItem {
    constructor(){
        this.handle = 0;
        this.name = "";
        this.minutes = 0;
        this.streamer = "";
        this.mods = "";
        this.help = "";
    }

    static initialize(sequelize){
        sequelize.define('module_support', {
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
            streamer: {
                type: DataTypes.STRING,
                allowNull: false
            },
            mods: {
                type: DataTypes.STRING,
                allowNull: false
            },
            help: {
                type: DataTypes.STRING,
                allowNull: true
            }
          }, {freezeTableName: true});
    }

    static async fill(sequelize){
        for(var item of Object.values(items))
            if(await sequelize.models.module_support.count({ where: { name: item.name } }) == 0)
                await sequelize.models.module_support.create(item);
    }
}
module.exports = ModuleSupportItem