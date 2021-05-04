const { DataTypes, Model } = require('sequelize');
const items = require('./channelItem.json');

class ChannelItem {
    constructor(data){
        this.name = data.name;
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
        for(var item of Object.values(items)){
            await sequelize.models.channel.create(item);
        }
    }
}
module.exports = ChannelItem