const { DataTypes, Model } = require('sequelize');
const items = require('./enemyItem.json');

class EnemyItem {
    constructor(){
        this.handle = 0;
        this.value = "";
        this.experience = 0;
        this.defence = 0;
        this.attack = 0;
        this.life = 0;
    }

    static initialize(sequelize){
        sequelize.define('loot_enemy', {
            handle: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            value: {
                type: DataTypes.STRING,
                allowNull: false
            },
            experience: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            defence: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            attack: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            life: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
          }, {freezeTableName: true});
    }

    static async fill(sequelize){
        for(var item of Object.values(items))
            if(await sequelize.models.loot_enemy.count({ where: { handle: item.handle } }) == 0)
                await sequelize.models.loot_enemy.create(item);
    }
}
module.exports = EnemyItem