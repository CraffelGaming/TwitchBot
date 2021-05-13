const { DataTypes, Model } = require('sequelize');
const items = require('./objectItem.json');

class ObjectItem {
    constructor(){
        this.handle = 0;
        this.value = "";
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
            }
          }, {freezeTableName: true});
    }

    static async fill(sequelize){
        for(var item of Object.values(items)){
            await sequelize.models.loot_object.create(item);
        }
    }
}

module.exports = ObjectItem