const { DataTypes, Model } = require('sequelize');
const items = require('./actionItem.json');

class ActionItem {
    constructor(){
        this.handle = 0;
        this.value = "";
    }

    static initialize(sequelize){
        sequelize.define('loot_action', {
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
        for(var item of Object.values(items)){
            await sequelize.models.loot_action.create(item);
        }
    }
}
module.exports = ActionItem