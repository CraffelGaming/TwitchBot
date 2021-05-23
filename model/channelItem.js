const { DataTypes, Model } = require('sequelize');
const items = require('./channelItem.json');

class ChannelItem {
    constructor(data){
        this.name = data.name;
        this.displayName = data.displayName;
        this.language = data.language;
        this.isActive = data.isActive;
        this.database = {};
        this.modules = [];
    }

    static initialize(sequelize){
        sequelize.define('channel', {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                primaryKey: true
            },
            displayName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            language: {
                type: DataTypes.STRING,
                allowNull: false
            },
            isActive: {
               type: DataTypes.BOOLEAN,
               allowNull: false
           }
          }, {freezeTableName: true});
    }

    static async fill(sequelize){
        for(var item of Object.values(items))
            if(await sequelize.models.channel.count({ where: { name: item.name } }) == 0)
                await sequelize.models.channel.create(item);
    }
}
module.exports = ChannelItem