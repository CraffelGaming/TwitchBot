const { DataTypes, Model } = require('sequelize');
const items = require('./levelItem.json');

class LevelItem {
    constructor(){
        this.handle = 0;
        this.experienceMin = 0;
        this.experienceMax = 0;
    }

    static initialize(sequelize){
        sequelize.define('loot_level', {
            handle: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            experienceMin: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            experienceMax: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
          }, {freezeTableName: true});
    }

    static async fill(sequelize){
        for(var item of Object.values(items))
            if(await sequelize.models.loot_level.count({ where: { handle: item.handle } }) == 0)
                await sequelize.models.loot_level.create(item);
    }
}
module.exports = LevelItem