const { DataTypes, Model } = require('sequelize');
const items = require('./moduleDiscordItem.json');

class ModuleDiscordItem {
    constructor(){
        this.handle = 0;
        this.link = "";
        this.minutes = 0;
        this.help = "";
    }

    static initialize(sequelize){
        sequelize.define('module_discord', {
            handle: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            link: {
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
        for(var item of Object.values(items))
            if(await sequelize.models.module_discord.count({ where: { link: item.link } }) == 0)
                await sequelize.models.module_discord.create(item);
    }
}
module.exports = ModuleDiscordItem