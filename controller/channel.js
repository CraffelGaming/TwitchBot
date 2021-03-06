const Donation = require('../modules/donate.js');
const Key = require('../modules/key.js');
const Time = require('../modules/time.js');
const Loot = require('../modules/loot');
const Help = require('../modules/help');
const Say = require('../modules/say');
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
        this.client = {};
    }

    async initialize(client){
        await this.globalDatabase.initializeGlobal();
        this.client = client;
    }

    async getChannels(){
        return await this.globalDatabase.sequelize.models.channel.findAll();
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
            channelItem.commands =await channelItem.database.sequelize.models.command.findAll();
            var modules = await this.globalDatabase.sequelize.models.module.findAll();

            for (var module of Object.values(modules)) {
                var moduleItem = new ModuleItem(module);
                var translation = require(path.join(__dirname, '../language/' + moduleItem.name + '/' + channelItem.language + '.json'));
                console.log(`load ${module.name} for channel ${channelItem.name}`);

                switch(moduleItem.name){
                    case "donate":
                        var element = (await channelItem.database.sequelize.models.module_donate.findOne());
                        var donation = new Donation(translation, element, channelItem.language);
                        await donation.initialize(channelItem);
                        moduleItem.interval = this.interval(element, this.client, channelItem, donation);
                        moduleItem.object = donation;
                        channelItem.modules.push(moduleItem);
                        break;
                    case "key":
                        var element = (await channelItem.database.sequelize.models.module_key.findOne());
                        var key = new Key(translation, element, channelItem.language);
                        await key.initialize(channelItem);
                        moduleItem.interval = this.interval(element, this.client, channelItem, key);
                        moduleItem.object = key;
                        channelItem.modules.push(moduleItem);
                        break;
                    case "time":
                        var element = (await channelItem.database.sequelize.models.module_time.findOne());
                        var time = new Time(translation, element, channelItem.name, channelItem.language);
                        await time.initialize(channelItem);
                        moduleItem.interval = this.interval(element, this.client, channelItem, time);
                        moduleItem.object = time;
                        channelItem.modules.push(moduleItem);
                        break;
                    case "loot":
                        var element = (await channelItem.database.sequelize.models.module_loot.findOne());
                        var loot = new Loot(translation, element, channelItem.language);
                        await loot.initialize(channelItem);
                        moduleItem.interval = this.interval(element, this.client, channelItem, loot);
                        moduleItem.object = loot;
                        channelItem.modules.push(moduleItem);
                        break;
                    case "help":
                        var element = (await channelItem.database.sequelize.models.module_help.findOne());             
                        var help = new Help(translation, element, channelItem.language);
                        await help.initialize(channelItem);
                        moduleItem.interval = this.interval(element, this.client, channelItem, help);
                        moduleItem.object = help;
                        channelItem.modules.push(moduleItem);
                        break;
                    case "administration":
                        var element = (await channelItem.database.sequelize.models.module_administration.findOne());
                        var administration = new Administration(translation, element, channelItem.language, this);
                        await administration.initialize(channelItem);
                        moduleItem.object = administration;
                        channelItem.modules.push(moduleItem);
                        break;
                    case "say":
                        for (var element of Object.values(await channelItem.database.sequelize.models.module_say.findAll())) {
                            await this.addSay(translation, element, channelItem, module);
                        }
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

    async addSay(translation, element, channelItem, module){
        var say = new Say(translation, element, channelItem, channelItem.language);
        await say.initialize(channelItem);

        var sayItem = new ModuleItem(module);
        sayItem.object = say;
        sayItem.name = element.command;
        element.name = element.command;

        channelItem.commands.push(channelItem.database.sequelize.models.command.build({ name: element.command, command: `!${element.command}`}));
        channelItem.commands.push(channelItem.database.sequelize.models.command.build({ name: element.command, command: `!${element.command}text`}));
        channelItem.commands.push(channelItem.database.sequelize.models.command.build({ name: element.command, command: `!${element.command}help`}));
        channelItem.commands.push(channelItem.database.sequelize.models.command.build({ name: element.command, command: `!${element.command}start`}));
        channelItem.commands.push(channelItem.database.sequelize.models.command.build({ name: element.command, command: `!${element.command}stop`}));
        channelItem.commands.push(channelItem.database.sequelize.models.command.build({ name: element.command, command: `!${element.command}interval`}));
        
        sayItem.interval = this.interval(element, this.client, channelItem, say);

        channelItem.modules.push(sayItem);
    }

    async removeSay(element, channelItem){
        await channelItem.database.sequelize.models.module_say.destroy({ where: { command: element.name } })
        channelItem.commands = channelItem.commands.filter(x => !x.command.startsWith(`!${element.name}`));
        channelItem.modules = channelItem.modules.filter(x => x.name != element.name);     
        clearInterval(element.interval);
    }

    interval(module, client, channel, object){
        return setInterval(
            async () => {  
                if(module.minutes > 0){
                    var difference = Math.floor((Date.now() - object.lastRun) / 1000 / 60)
                    if(channel && channel.isActive && difference >= module.minutes && module.minutes > 0){
                        try{
                            object.lastRun = Date.now();
                            console.log(`INF: intervall module [${module.name}]`);
                            var message = await object.callMessage(channel);
                            if(message && message.length > 0){
                                channel.puffer.addMessage(message);
                            }
                        } catch(ex){
                            console.error(`ERROR [${module.name}]`, ex);
                        }
                    }
                }
            },
            1000 * 60
        ); 
    }

    async execute(target, moduleName, message, playerName, parameter){
        try{
            var channelItem = this.channels.find(x => x.name === target);
            if((channelItem && channelItem.isActive) || message.toLowerCase().startsWith("!admin")){
                var module = channelItem.modules.find(x => x.name === moduleName);
                if(module){
                    return await module.object.execute(channelItem, playerName, message, target, parameter);
                }
            } else return "Der Bot ist aktuell deaktiviert."
        } catch (ex){
            console.error(`ERROR [${module.name}]`, ex);
        }
    }
}

module.exports = Channel