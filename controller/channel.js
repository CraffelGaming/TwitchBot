const Donation = require('../modules/donate.js');
const Key = require('../modules/key.js');
const Time = require('../modules/time.js');
const Support = require('../modules/support.js');
const Loot = require('../modules/loot');
const Help = require('../modules/help');
const Administration = require('../modules/administration');
const Connection = require('../database/connection');
const ChannelItem = require('../model/channelItem');
const ModuleItem = require('../model/moduleItem');
const Puffer = require('./puffer');

class Channel {
    constructor(){
        this.globalDatabase = new Connection(new Buffer.from('global').toString('base64'));
        this.channels = [];
        this.commands = [];
    }

    async initialize(){
        await this.globalDatabase.initializeGlobal();
        this.commands = await this.getCommand();
    }

    async getChannels(){
        return await this.globalDatabase.sequelize.models.channel.findAll();
    }

    async getCommand(){
        return await this.globalDatabase.sequelize.models.command.findAll();
    }

    async build(channels, client){       
        for (var channel of Object.values(channels)) {
            var channelItem = new ChannelItem(channel.dataValues);
            channelItem.database = new Connection(new Buffer.from(channel.name).toString('base64'));
            await channelItem.database.initialize();
            var modules = await this.globalDatabase.sequelize.models.module.findAll();

            for (var module of Object.values(modules)) {
                var moduleItem = new ModuleItem(module.dataValues);
                var translation = require('../language/' + moduleItem.name + '/' + channelItem.language + '.json');
                console.log(`load ${module.name} for channel ${channelItem.name}`);

                switch(moduleItem.name){
                    case "donate":
                        var element = (await channelItem.database.sequelize.models.module_donate.findOne()).dataValues; //TODO: Mehr als 1x...
                        if(element.minutes > 0){
                            var donation = new Donation(channelItem.database, translation, element);
                            await donation.initialize();
                            this.interval(element, client, channelItem, donation);
                            moduleItem.object = donation;
                            channelItem.modules.push(moduleItem);
                        }
                        break;
                    case "key":
                        var element = (await channelItem.database.sequelize.models.module_key.findOne()).dataValues; //TODO: Mehr als 1x...
                        if(element.minutes > 0){
                            var key = new Key(channelItem.database, translation, element);
                            await key.initialize();
                            this.interval(element, client, channelItem, key);
                            moduleItem.object = key;
                            channelItem.modules.push(moduleItem);
                        }
                        break;
                    case "time":
                        var element = (await channelItem.database.sequelize.models.module_time.findOne()).dataValues; //TODO: Mehr als 1x...
                        if(element.minutes > 0){
                            var time = new Time(channelItem.database, translation, element, channelItem.name);
                            await time.initialize();
                            this.interval(element, client, channelItem, time);
                            moduleItem.object = time;
                            channelItem.modules.push(moduleItem);
                        }
                        break;
                    case "support":
                        var element = (await channelItem.database.sequelize.models.module_support.findOne()).dataValues; //TODO: Mehr als 1x...
                        if(element.minutes > 0){
                            var support = new Support(channelItem.database, translation, element);
                            await support.initialize();
                            this.interval(element, client, channelItem, support);
                            moduleItem.object = support;
                            channelItem.modules.push(moduleItem);
                        }
                        break;
                    case "loot":
                        var element = (await channelItem.database.sequelize.models.module_loot.findOne()).dataValues; //TODO: Mehr als 1x...
                        if(element.minutes > 0){
                            var loot = new Loot(channelItem.database, translation, element);
                            await loot.initialize();
                            this.interval(element, client, channelItem, loot);
                            moduleItem.object = loot;
                            channelItem.modules.push(moduleItem);
                        }
                        break;
                    case "help":
                        var element = (await channelItem.database.sequelize.models.module_help.findOne()).dataValues; //TODO: Mehr als 1x...
                        if(element.minutes > 0){
                            var help = new Help(channelItem.database, translation, element);
                            await help.initialize();
                            this.interval(element, client, channelItem, help);
                            moduleItem.object = help;
                            channelItem.modules.push(moduleItem);
                        }
                        break;
                    case "administration":
                            var element = (await channelItem.database.sequelize.models.module_administration.findOne()).dataValues; //TODO: Mehr als 1x...
                            var administration = new Administration(channelItem.database, translation, element, channelItem);
                            await administration.initialize();
                            moduleItem.object = administration;
                            channelItem.modules.push(moduleItem);
                        break;
                }
            }
            channelItem.puffer = new Puffer(client, channelItem);
            this.channels.push(channelItem);
        }
    }

    interval(module, client, channel, object){
        setInterval(
            async () => {  
                if(channel && channel.isActive){
                    try{
                        console.log(`LOG [${module.name}]`);
                        var message = await object.callMessage();
                        if(message && message.length > 0){
                            //PUFFER
                            channel.puffer.addMessage(message);
                            //client.say(channel.name, message);
                        }
                    } catch(ex){
                        console.error(`ERROR [${module.name}]`, ex);
                    }
                }
            },
            1000 * 60 * module.minutes
        ); 
    }

    async execute(target, moduleName, message, playerName, parameter){
        try{
            var channel = this.channels.find(x => x.name === target);
            if(channel && (channel.isActive || message == "!adminstart" || message == "!adminstop")){
                var module = channel.modules.find(x => x.name === moduleName);

                if(module){
                    return await module.object.execute(playerName, message, target, parameter);
                }
            } else return "Der Bot ist aktuell deaktiviert."
        } catch (ex){
            console.error(`ERROR [${module.name}]`, ex);
        }
    }
}

module.exports = Channel