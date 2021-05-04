const { DataTypes, Model } = require('sequelize');
const items = require('./moduleItem.json');

class ModuleItem {
    constructor(data){
        this.name = data.name;
        this.description = data.name;
        this.help = data.name;
        this.object = {};
    }

    static initialize(sequelize){
        sequelize.define('module', {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                primaryKey: true
            },
            description: {
                type: DataTypes.STRING,
                allowNull: true
            }
          }, {freezeTableName: true});
    }

    static async fill(sequelize){
        for(var item of Object.values(items)){
            await sequelize.models.module.create(item);
        }
    }
}
module.exports = ModuleItem