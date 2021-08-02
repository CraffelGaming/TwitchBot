const { DataTypes, Model } = require('sequelize');
const items = require('./moduleSayItem.json');

class ModuleSayItem {
    constructor(){
        this.handle = 0;
        this.text = "";
        this.minutes = 0;
        this.help = "";
        this.command = "";
        this.counter = 0;
        this.name = "";
    }

    static initialize(sequelize){
        sequelize.define('module_say', {
            handle: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            text: {
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
            command: {
                type: DataTypes.STRING,
                allowNull: true
            },
            isActive: {
                type: DataTypes.BOOLEAN,
                allowNull: true
            }
          }, {freezeTableName: true});
    }

    static async fill(sequelize){
        for(var item of Object.values(items))
            if(await sequelize.models.module_say.count({ where: { command: item.command } }) == 0)
                await sequelize.models.module_say.create(item);
    }
}
module.exports = ModuleSayItem