const { DataTypes, Model } = require('sequelize');

class TwitchUserItem {
    constructor(){
        this.channelName = "";
        this.displayName = "";
        this.type = "";
        this.broadcaster_type = "";
        this.description = "";
        this.profileImageUrl = "";
        this.viewCount = 0;
        this.eMail = "";
    }

    static initialize(sequelize){
        sequelize.define('twitch_user', {
            channelName: {
                type: DataTypes.STRING,
                allowNull: false,
                primaryKey: true
            },
            displayName: {
                type: DataTypes.STRING,
                allowNull: true
            },
            type: {
                type: DataTypes.STRING,
                allowNull: true
            },
            broadcaster_type: {
                type: DataTypes.STRING,
                allowNull: true
            },
            description: {
               type: DataTypes.STRING,
               allowNull: true
            },
            profileImageUrl: {
              type: DataTypes.STRING,
              allowNull: true
            },
            viewCount: {
             type: DataTypes.INTEGER,
             allowNull: false,
             defaultValue: 0
            },
            eMail: {
             type: DataTypes.STRING,
             allowNull: true
            }
          }, {freezeTableName: true});
    }

    static async get(sequelize, channelName){
        var [twitch, created] = await sequelize.models.twitch_user.findOrCreate({ 
            where: { channelName: channelName }
        });
        console.log(`INF: new twitch user ${twitch.channelName}, created: ${created}`);
        return twitch;
    }
}
module.exports = TwitchUserItem