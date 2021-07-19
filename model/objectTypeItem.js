const { DataTypes, Model } = require('sequelize');
const items = require('./objectTypeItem.json');

class ObjectTypeItem {
    constructor(){
        this.handle = 0;
        this.name = "";
    }

    static initialize(sequelize){
        sequelize.define('loot_object_type', {
            handle: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
             },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            }
          }, {freezeTableName: true});
    }

    static async fill(sequelize){
        for(var item of Object.values(items))
            if(await sequelize.models.loot_object_type.count({ where: { handle: item.handle } }) == 0)
                await sequelize.models.loot_object_type.create(item);
    }
}

module.exports = ObjectTypeItem