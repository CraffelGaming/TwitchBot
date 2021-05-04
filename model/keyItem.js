const { DataTypes, Model } = require('sequelize');
const items = require('./keyItem.json');

class EndingItem {
    constructor(){
        this.handle = 0;
        this.key = "";
        this.name = "";
    }

    static initialize(sequelize){
        sequelize.define('key', {
            handle: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
             },
             key: {
                type: DataTypes.STRING,
                allowNull: false
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            }
          }, {freezeTableName: true});
    }

    static async fill(sequelize){
        for(var item of Object.values(items)){
            await sequelize.models.key.create(item);
        }
    }
}
module.exports = EndingItem