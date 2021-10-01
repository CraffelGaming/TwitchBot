const { DataTypes, Model } = require('sequelize');
const items = require('./versionItem.json');
const itemsGlobal = require('./versionGlobalItem.json');

class VersionItem {
    constructor(data){
        this.name = data.name;
        this.description = data.name;
        this.help = data.name;
        this.object = {};
    }

    static initialize(sequelize){
        sequelize.define('version', {
            handle: {
                type: DataTypes.STRING,
                allowNull: false,
                primaryKey: true
            },
            isInstalled: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            }
          }, {freezeTableName: true});
    }

    static async fill(sequelize, isGlobal){
        if(!isGlobal){
            for(var item of Object.values(items))
            if(await sequelize.models.version.count({ where: { handle: item.handle } }) == 0)
                await sequelize.models.version.create(item);
        } else {
            for(var itemGlobal of Object.values(itemsGlobal))
            if(await sequelize.models.version.count({ where: { handle: itemGlobal.handle } }) == 0)
                await sequelize.models.version.create(itemGlobal);
        }

    }
}
module.exports = VersionItem