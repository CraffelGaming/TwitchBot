
const { DataTypes, Model } = require('sequelize');
const items = require('./commandItem.json');

class CommandItem {
    constructor(){
        this.command = "";
        this.name = "";
    }

    static initialize(sequelize){
        sequelize.define('command', {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                primaryKey: true
            },
            command: {
                type: DataTypes.STRING,
                allowNull: false,
                primaryKey: true
            }
          }, {freezeTableName: true});
    }

    static async fill(sequelize){
        for(var item of Object.values(items)){
            for(var command of Object.values(item.commands)){
                var element = {name: item.name, command: command}
                await sequelize.models.command.create(element);
            }
        }
    }
}
module.exports = CommandItem