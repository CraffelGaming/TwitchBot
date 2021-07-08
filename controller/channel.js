const Donation = require('../modules/donate.js');
const Key = require('../modules/key.js');
const Time = require('../modules/time.js');
const Support = require('../modules/support.js');
const Loot = require('../modules/loot');
const Help = require('../modules/help');
const Discord = require('../modules/discord');
const Administration = require('../modules/administration');
const Connection = require('../database/connection');
const ChannelItem = require('../model/channelItem');
const ModuleItem = require('../model/moduleItem');
const Puffer = require('./puffer');

var path = require('path');

class Channel {
    constructor(){
        this.globalDatabase = new Connection(new Buffer.from('global').toString('base64'));
        this.channels = [];
        this.commands = [];
        this.client = {};
    }

    async initialize(client){
        await this.globalDatabase.initializeGlobal();
        this.commands = await this.getCommand();
        this.client = client;
    }

    async getChannels(){
        return await this.globalDatabase.sequelize.models.channel.findAll();
    }

    async getCommand(){
        return await this.globalDatabase.sequelize.models.command.findAll();
    }

    addChannel(channelName){
        if(!this.channels.find(x => x.name == "#" + channelName)){
            var channel = {};
            channel.name = "#" + channelName
            channel.displayName = channelName;
            channel.language = "de-DE";
            channel.isActive = true;
            return this.buildChannel(channel);
        }
        return false;
    }

    async buildChannels(channels){
        try {
            for (var channel of Object.values(channels))
                this.buildChannel(channel);
        } catch (ex){
            console.error(`ERR: build channels`, ex);
        } 
    }

    async buildChannel(channel){     
        try {
            var channelItem = new ChannelItem(channel);
            channelItem.database = new Connection(new Buffer.from(channel.name).toString('base64'));
            await channelItem.database.initialize();
            var modules = await this.globalDatabase.sequelize.models.module.findAll();

            for (var module of Object.values(modules)) {
                var moduleItem = new ModuleItem(module);
                var translation = require(path.join(__dirname, '../language/' + moduleItem.name + '/' + channelItem.language + '.json'));
                console.log(`load ${module.name} for channel ${channelItem.name}`);

                switch(moduleItem.name){
                    case "donate":
                        var element = (await channelItem.database.sequelize.models.module_donate.findOne());
                        if(element.minutes > 0){
                            var donation = new Donation(translation, element);
                            await donation.initialize(channelItem);
                            this.interval(element, this.client, channelItem, donation);
                            moduleItem.object = donation;
                            channelItem.modules.push(moduleItem);
                        }
                        break;
                    case "key":
                        var element = (await channelItem.database.sequelize.models.module_key.findOne());
                        if(element.minutes > 0){
                            var key = new Key(translation, element);
                            await key.initialize(channelItem);
                            this.interval(element, this.client, channelItem, key);
                            moduleItem.object = key;
                            channelItem.modules.push(moduleItem);
                        }
                        break;
                    case "time":
                        var element = (await channelItem.database.sequelize.models.module_time.findOne());
                        if(element.minutes > 0){
                            var time = new Time(translation, element, channelItem.name);
                            await time.initialize(channelItem);
                            this.interval(element, this.client, channelItem, time);
                            moduleItem.object = time;
                            channelItem.modules.push(moduleItem);
                        }
                        break;
                    case "support":
                        var element = (await channelItem.database.sequelize.models.module_support.findOne());
                        if(element.minutes > 0){
                            var support = new Support(translation, element);
                            await support.initialize(channelItem);
                            this.interval(element, this.client, channelItem, support);
                            moduleItem.object = support;
                            channelItem.modules.push(moduleItem);
                        }
                        break;
                    case "loot":
                        var element = (await channelItem.database.sequelize.models.module_loot.findOne());
                        if(element.minutes > 0){
                            var loot = new Loot(translation, element);
                            await loot.initialize(channelItem);
                            this.interval(element, this.client, channelItem, loot);
                            moduleItem.object = loot;
                            channelItem.modules.push(moduleItem);
                        }
                        break;
                    case "help":
                        var element = (await channelItem.database.sequelize.models.module_help.findOne());
                        if(element.minutes > 0){
                            var help = new Help(translation, element);
                            await help.initialize(channelItem);
                            this.interval(element, this.client, channelItem, help);
                            moduleItem.object = help;
                            channelItem.modules.push(moduleItem);
                        }
                        break;
                    case "administration":
                        var element = (await channelItem.database.sequelize.models.module_administration.findOne());
                        var administration = new Administration(translation, element, channelItem);
                        await administration.initialize(channelItem);
                        moduleItem.object = administration;
                        channelItem.modules.push(moduleItem);
                        break;
                    case "discord":
                        var element = (await channelItem.database.sequelize.models.module_discord.findOne());
                        var discord = new Discord(translation, element, channelItem);
                        await discord.initialize(channelItem);
                        moduleItem.object = discord;
                        channelItem.modules.push(moduleItem);
                        break;
                }
            }
            channelItem.puffer = new Puffer(this.client, channelItem);  
            channelItem.register(this.globalDatabase.sequelize);         
            this.channels.push(channelItem);
            this.client.join(channelItem.name.replace('#', ''));
            return true;
        } catch (ex){
            console.error(`ERR: build channel`, ex);
        }
        return false;
    }

    interval(module, client, channel, object){
        setInterval(
            async () => {  
                if(channel && channel.isActive){
                    try{
                        console.log(`INF: intervall module [${module.name}]`);
                        var message = await object.callMessage(channel);
                        if(message && message.length > 0){
                            channel.puffer.addMessage(message);
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
                    return await module.object.execute(channel, playerName, message, target, parameter);
                }
            } else return "Der Bot ist aktuell deaktiviert."
        } catch (ex){
            console.error(`ERROR [${module.name}]`, ex);
        }
    }
}

module.exports = Channel