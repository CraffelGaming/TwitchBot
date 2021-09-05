const { DataTypes, Model } = require('sequelize');
const items = require('./locationItem.json');

class LocationItem {
    constructor(){
        this.handle = 0;
        this.value = "";
    }

    static initialize(sequelize){
        sequelize.define('loot_location', {
            handle: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
             },
            value: {
                type: DataTypes.STRING,
                allowNull: false
            }
          }, {freezeTableName: true});
    }

    static async fill(sequelize){
        for(var item of Object.values(items))
            if(await sequelize.models.loot_location.count({ where: { handle: item.handle } }) == 0)
                await sequelize.models.loot_location.create(item);
    }
}
module.exports = LocationItem