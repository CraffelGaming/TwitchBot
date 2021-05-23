const { DataTypes, Model } = require('sequelize');
const items = require('./endingItem.json');

class EndingItem {
    constructor(){
        this.handle = 0;
        this.key = "";
        this.name = "";
    }

    static initialize(sequelize){
        sequelize.define('loot_ending', {
            handle: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
             },
            value: {
                type: DataTypes.STRING,
                allowNull: false
            },
            mode: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
          }, {freezeTableName: true});
    }

    static async fill(sequelize){
        for(var item of Object.values(items))
            if(await sequelize.models.loot_ending.count({ where: { handle: item.handle } }) == 0)
                await sequelize.models.loot_ending.create(item);
    }
}
module.exports = EndingItem