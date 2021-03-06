const { DataTypes, Model } = require('sequelize');

class LootHeroItem {
    constructor(){
        this.handle = 0;
        this.name = "";
        this.lastSteal = Date.now();
        this.lastJoin = Date.now();
        this.startIndex = 0;
        this.experience = 0;
        this.gold = 0;
        this.goldMultipler = 0;
        this.stealMultipler = 0;
        this.defenceMultipler = 0;
        this.isActive = false;
        this.bloodPoints = 0;
    }

    static initialize(sequelize){
        sequelize.define('loot_hero', {
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
            lastSteal: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: Date.UTC(2020, 1, 1)
            },
            lastJoin: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: Date.UTC(2020, 1, 1)
            },
            startIndex: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            experience: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            gold: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            goldMultipler: {
                type: DataTypes.DOUBLE,
                allowNull: false,
                defaultValue: 1
            },
            stealMultipler: {
                type: DataTypes.DOUBLE,
                allowNull: false,
                defaultValue: 1
            },
            defenceMultipler: {
                type: DataTypes.DOUBLE,
                allowNull: false,
                defaultValue: 1
            },
            isActive: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true
            },
            bloodPoints: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            lastBlood: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: Date.UTC(2020, 1, 1)
            }
          }, {freezeTableName: true});
    }

    static async get(sequelize, heroName, heroStartIndex){
        var [hero, created] = await sequelize.models.loot_hero.findOrCreate({ 
            where: { name: heroName }
        });
        console.log(`INF: new hero ${hero.name}, created: ${created}`);
        return hero;
    }
}
module.exports = LootHeroItem