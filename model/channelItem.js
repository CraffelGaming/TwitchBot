const { DataTypes, Model } = require('sequelize');

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

    async register(sequelize){
            if(await sequelize.models.channel.count({ where: { name: this.name } }) == 0)
                await sequelize.models.channel.create(this);
    }
}
module.exports = ChannelItem