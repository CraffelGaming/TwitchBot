const { Sequelize, DataTypes, Model } = require('sequelize');

const VersionItem = require('../model/versionItem');

const ObjectItem = require('../model/objectItem');
const ActionItem = require('../model/actionItem');
const LocationItem = require('../model/locationItem');
const EndingItem = require('../model/endingItem');
const EnemyItem = require('../model/enemyItem');
const LevelItem = require('../model/levelItem');
const KeyItem = require('../model/keyItem');
const ChannelItem = require('../model/channelItem');
const ModuleItem = require('../model/moduleItem');
const CommandItem = require('../model/commandItem');

const ModuleAdministrationItem = require('../model/module/moduleAdministrationItem');
const ModuleDonateItem = require('../model/module/moduleDonateItem');
const ModuleHelpItem = require('../model/module/moduleHelpItem');
const ModuleKeyItem = require('../model/module/moduleKeyItem');
const ModuleLootItem = require('../model/module/moduleLootItem');
const ModuleSupportItem = require('../model/module/moduleSupportItem');
const ModuleTimeItem = require('../model/module/moduleTimeItem');

const LootHeroItem = require('../model/loot/lootHeroItem');
const LootInventoryItem = require('../model/loot/lootInventoryItem');

const fs = require('fs')
var path = require('path');

class Connection {
    constructor(databaseName){
        this.databaseName = databaseName;
        this.databasePath = path.join(__dirname, this.databaseName + '.sqlite') ;
        this.isNewDatabase = !fs.existsSync(this.databasePath);
        this.sequelize = new Sequelize({ dialect: 'sqlite', storage: this.databasePath });

        console.log(`DATABASE Name ${this.databaseName}'`);      
        console.log(`DATABASE isNew ${this.isNewDatabase}'`);    
    }

    async initialize(){
        try{
            console.log("STORAGE: " + this.sequelize.options.storage);

            await this.sequelize.authenticate();

            VersionItem.initialize(this.sequelize);

            ObjectItem.initialize(this.sequelize);
            ActionItem.initialize(this.sequelize);
            LocationItem.initialize(this.sequelize);
            EndingItem.initialize(this.sequelize);
            EnemyItem.initialize(this.sequelize);
            LevelItem.initialize(this.sequelize);
            KeyItem.initialize(this.sequelize);
            
            ModuleAdministrationItem.initialize(this.sequelize);
            ModuleDonateItem.initialize(this.sequelize);
            ModuleHelpItem.initialize(this.sequelize);
            ModuleKeyItem.initialize(this.sequelize);
            ModuleLootItem.initialize(this.sequelize);
            ModuleSupportItem.initialize(this.sequelize);
            ModuleTimeItem.initialize(this.sequelize);

            LootHeroItem.initialize(this.sequelize);
            LootInventoryItem.initialize(this.sequelize);

            await this.sequelize.sync();
            
            await VersionItem.fill(this.sequelize);
            await this.updater();

            await ObjectItem.fill(this.sequelize);
            await ActionItem.fill(this.sequelize);
            await LocationItem.fill(this.sequelize);
            await EndingItem.fill(this.sequelize);
            await EnemyItem.fill(this.sequelize);
            await LevelItem.fill(this.sequelize);
            await KeyItem.fill(this.sequelize);
            
            await ModuleAdministrationItem.fill(this.sequelize);
            await ModuleDonateItem.fill(this.sequelize);
            await ModuleHelpItem.fill(this.sequelize);
            await ModuleKeyItem.fill(this.sequelize);
            await ModuleLootItem.fill(this.sequelize);
            await ModuleSupportItem.fill(this.sequelize);
            await ModuleTimeItem.fill(this.sequelize);

            console.log('DATABASE Connection has been established successfully.');
            return true;
        }  catch (ex){
            console.error('ERROR DATABASE Unable to connect to the database:', ex);
            return false;
        }
    }

    async initializeGlobal(){
        try{
            console.log("STORAGE: " + this.sequelize.options.storage);

            await this.sequelize.authenticate();

            ChannelItem.initialize(this.sequelize);
            ModuleItem.initialize(this.sequelize);
            CommandItem.initialize(this.sequelize);
            
            await this.sequelize.sync();
            
            await ChannelItem.fill(this.sequelize);
            await ModuleItem.fill(this.sequelize);
            await CommandItem.fill(this.sequelize);

            console.log('DATABASE Connection has been established successfully.');
            return true;
        }  catch (ex){
            console.error('ERROR DATABASE Unable to connect to the database:', ex);
            return false;
        }
    }
    async updater(){
        try{
            var updates = await this.sequelize.models.version.findAll({where: {isInstalled: false}});

            for (var update of updates) {
                if(!this.isNewDatabase){
                    var fileName = path.join(__dirname, "migrations", update.handle + '.js') ;
                    var file = require(fileName);
                    await file.up(this.sequelize.getQueryInterface(), this.sequelize);
                }
                update.isInstalled = true;
                await update.save();
            }
        } catch (ex) {
            console.error('UPDATE ERROR:', ex);
        }
    } 
}

module.exports = Connection