
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
            description: {
                type: DataTypes.STRING,
                allowNull: true
            },
            command: {
                type: DataTypes.STRING,
                allowNull: false,
                primaryKey: true
            },
            isAdmin: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            }
          }, {freezeTableName: true});
    }

    static async fill(sequelize){
        for(var item of Object.values(items)){
            for(var command of Object.values(item.commands)){
                var element = {name: item.name, command: command.name, isAdmin: command.isAdmin, description: command.description};
                if(await sequelize.models.command.count({ where: { name: element.name,  command: element.command } }) == 0)
                    await sequelize.models.command.create(element);
                else await sequelize.models.command.update(
                        { isAdmin: command.isAdmin, description: command.description },
                        { where: { name: element.name, command: element.command } }
                    )
            }
        }
    }
}
module.exports = CommandItem