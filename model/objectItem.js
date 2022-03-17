const { DataTypes, Model } = require('sequelize');
const items = require('./objectItem.json');

class ObjectItem {
    constructor(){
        this.handle = 0;
        this.value = "";
        this.gold = 0;
        this.type = 0;
    }

    static initialize(sequelize){
        sequelize.define('loot_object', {
            handle: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
             },
            value: {
                type: DataTypes.STRING,
                allowNull: false
            },
            gold: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            type: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            }
          }, {freezeTableName: true});
    }

    static async fill(sequelize){
        for(var item of Object.values(items))
            if(await sequelize.models.loot_object.count({ where: { handle: item.handle } }) == 0)
                await sequelize.models.loot_object.create(item);
            //else await sequelize.models.loot_object.update(
            //        { title: item.title, gold: item.gold, type: item.type, value: item.value },
            //        { where: { handle: item.handle } }
            //    )
    }
    static async getMaxHandle(sequelize, heroName, heroStartIndex){
        var [hero, created] = await sequelize.models.loot_object.findAll({
            attributes: [Sequelize.fn('max', Sequelize.col('handle'))],
            raw: true,
        });
        console.log(`INF: new hero ${hero.name}, created: ${created}`);
        return hero;
    }
}

module.exports = ObjectItem