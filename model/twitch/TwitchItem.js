const { DataTypes, Model } = require('sequelize');

class TwitchItem {
    constructor(){
        this.state = "";
        this.channelName = "";
        this.accessToken = "";
        this.refresh_token = "";
        this.scope = "";
        this.token_type = "";
    }

    static initialize(sequelize){
        sequelize.define('twitch', {
            state: {
                type: DataTypes.STRING,
                allowNull: false,
                primaryKey: true
            },
            channelName: {
                type: DataTypes.STRING,
                allowNull: true
            },
            accessToken: {
                type: DataTypes.STRING,
                allowNull: true
            },
            refreshToken: {
                type: DataTypes.STRING,
                allowNull: true
            },
            scope: {
                type: DataTypes.STRING,
                allowNull: true
            },
            tokenType: {
               type: DataTypes.STRING,
               allowNull: true
           }
          }, {freezeTableName: true});
    }

    static async get(sequelize, state){
        var [twitch, created] = await sequelize.models.twitch.findOrCreate({ 
            where: { state: state }
        });
        console.log(`INF: new twitch ${twitch.state}, created: ${created}`);
        return twitch;
    }
}
module.exports = TwitchItem