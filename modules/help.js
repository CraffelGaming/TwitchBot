const Module = require('./module');

class Help extends Module{
    constructor(translation, element, language){
        super(translation, element, language);
    }

    initialize(channel){

    }
    
    async execute(channel, playerName, message, target, parameter){
        var result = super.execute(channel, playerName, message, target, parameter, "help");
        if(result) return result;

        try{
            switch(message){
                case "!help":
                    if(this.element.isActive)
                        return await this.buildMessage(channel); 
                    else return this.basicTranslation.notActive;
                case "!helpclear":
                    if(this.isOwner(target, playerName))
                        return this.clear(channel);
                    else return this.basicTranslation.clearError;
            }     
        } catch(ex){
            console.error(`ERROR [LOOT]`, ex);
        }   
    }

    clear(channel){
        return this.basicTranslation.clear;
    }

    async callMessage(channel){
        var message = "";
        if(this.element.isActive){                    
            message = await this.buildMessage(channel);
        }
        return message;
    }

    async buildMessage(channel){
        var result = ``;
        try{
            var module_donate = (await channel.database.sequelize.models.module_donate.findOne()).dataValues;
            var module_key = (await channel.database.sequelize.models.module_key.findOne()).dataValues;
            var module_time = (await channel.database.sequelize.models.module_time.findOne()).dataValues;
            var module_loot = (await channel.database.sequelize.models.module_loot.findOne()).dataValues;
            var module_help = (await channel.database.sequelize.models.module_help.findOne()).dataValues;
            var module_administration = (await channel.database.sequelize.models.module_administration.findOne()).dataValues;

            for (var module_say of Object.values(await channel.database.sequelize.models.module_say.findAll()))
                if(module_say && module_say.isActive && module_say.help.length > 0) 
                    result += `${module_say.help} `;

            if(module_donate && module_donate.isActive && module_donate.help.length > 0) 
                result += `${module_donate.help} `;

            if(module_key && module_key.isActive && module_key.help.length > 0) 
                result += `${module_key.help} `;

            if(module_time && module_time.isActive && module_time.help.length > 0) 
                result += `${module_time.help} `;

            if(module_loot && module_loot.isActive && module_loot.help.length > 0) 
                result += `${module_loot.help} `;

            if(module_help && module_help.isActive && module_help.help.length > 0) 
                result += `${module_help.help} `;

            if(module_administration && module_help.isActive && module_administration.help.length > 0) 
                result += `${module_administration.help} `;
               
        if(result.length > 0)
            result = `${this.translation.startText} ` + result;
        else result = this.basicTranslation.notActive;

        } catch (ex){
            console.error(`ERROR`, ex);
        }
        return result;
    }
}

module.exports = Help