const Module = require('./module');
const ModuleItem = require('../model/moduleItem');

var path = require('path');

class Administration extends Module {
    constructor(translation, element, language, channel){
        super(translation, element, language);
        this.channel = channel;
    }
    
    initialize(channelItem){

    }

    async execute(channelItem, playerName, message, target, parameter){
        switch(message){
            case "!adminstart":
                if(this.isOwner(target, playerName))
                    return this.adminStart(channelItem);
                else return this.basicTranslation.startError;
            case "!adminstop":
                if(this.isOwner(target, playerName))
                    return this.adminStop(channelItem);
                else return this.basicTranslation.stopError;
            case "!adminadd":
                if(this.isOwner(target, playerName))
                    return await this.adminAdd(channelItem, parameter);
                else return this.basicTranslation.addError;
            case "!adminremove":
                if(this.isOwner(target, playerName))
                    return await this.adminRemove(channelItem, parameter);
                else return this.basicTranslation.removeError;
        }       
    }

    async adminAdd(channelItem, parameter){
        var expressions = /^[a-z0-9]+$/i;
        if(parameter && expressions.test(parameter)){
            if(!channelItem.modules.find(x => x.name == parameter)){
                var module = await this.channel.globalDatabase.sequelize.models.module.findOne({ where: { name: 'say' } })
                var element = new ModuleItem(module);
                element.command = parameter.toLowerCase();
                element.minutes = 0;
                element.help = '';
                element.text = '';
                element.isActive = false;           
                element = await channelItem.database.sequelize.models.module_say.create(element);
                var translation = require(path.join(__dirname, '../language/' + module.name + '/' + channelItem.language + '.json'));
                await this.channel.addSay(translation, element, channelItem, module);
                return this.basicTranslation.add;
            }
            return this.basicTranslation.moduleExists;
        } else return this.basicTranslation.noParameter;
    }

    async adminRemove(channelItem, parameter){
        var expressions = /^[a-z0-9]+$/i;
        if(parameter && expressions.test(parameter)){
            var moduleItem = channelItem.modules.find(x => x.name == parameter.toLowerCase());
            if(moduleItem){
                await this.channel.removeSay(moduleItem, channelItem);
                return this.basicTranslation.remove;
            } else return this.basicTranslation.moduleNotExists;
        } else return this.basicTranslation.noParameter;
    }

    adminStart(channelItem){
        if(channelItem && !channelItem.isActive){
            channelItem.isActive = true;
            return this.basicTranslation.start;
        } else return this.basicTranslation.alreadyStarted;
    }

    adminStop(channelItem){
        if(channelItem && channelItem.isActive){
            channelItem.isActive = false;
            this.modulesStop(channelItem);
            return this.basicTranslation.stop;
        } else return this.basicTranslation.alreadyStopped;
    }

    modulesStop(channelItem){
        if(channelItem){
            for (var module of Object.values(channelItem.modules)){
                module.object.stop();
            }
        }
    }
}

module.exports = Administration