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

    static async create(sequelize, item){
        var object = await sequelize.models.loot_object.create(item);
        console.log(`INF: new object ${object.handle}`);
        return object;
    }

    static async getMaxHandle(sequelize){
        var [hero] = await sequelize.models.loot_object.findAll({
            attributes: [sequelize.fn('max', sequelize.col('handle'))],
            raw: true,
        });
        console.log(`INF: next id  ${hero["max(`handle`)"]}`);
        return hero["max(`handle`)"];
    }
}

module.exports = ObjectItem