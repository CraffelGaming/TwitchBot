const { DataTypes, Model } = require('sequelize');

class LootInventoryItem {
    constructor(){
        this.objectHandle = 0;
        this.heroHandle = 0;
        this.quantity = 0;
    }

    static initialize(sequelize){
        sequelize.define('loot_inventory', {
            objectHandle: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            heroHandle: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            quantity: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            isReload: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: false
            }
          }, {freezeTableName: true});
    }

    static async get(sequelize, hero, object){
        var [item, created] = await sequelize.models.loot_inventory.findOrCreate({ 
            where: { objectHandle: object.handle, heroHandle: hero.handle }
        });
        console.log(`INF: new inventory ${object.value} quantity ${item.quantity}, created: ${created}`);
        return item;
    }
}
module.exports = LootInventoryItem