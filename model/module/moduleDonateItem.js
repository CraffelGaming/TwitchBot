const { DataTypes, Model } = require('sequelize');
const items = require('./moduleDonateItem.json');

class ModuleDonateItem {
    constructor(){
        this.handle = 0;
        this.name = "";
        this.donationMax = 0;
        this.minutes = 0;
        this.destination = "";
        this.help = "";
    }

    static initialize(sequelize){
        sequelize.define('module_donate', {
            handle: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
             },
            minutes: {
                type: DataTypes.DECIMAL,
                allowNull: false,
                defaultValue: 0
            },
            donationMax: {
               type: DataTypes.INTEGER,
               allowNull: false,
               defaultValue: 0
           },
           destination: {
              type: DataTypes.STRING,
              allowNull: false,
              defaultValue: 0
          },
          help: {
              type: DataTypes.STRING,
              allowNull: true
          }
          }, {freezeTableName: true});
    }

    static async fill(sequelize){
        for(var item of Object.values(items))
            if(await sequelize.models.module_donate.count({ where: { name: item.name } }) == 0)
                await sequelize.models.module_donate.create(item);
    }
}
module.exports = ModuleDonateItem