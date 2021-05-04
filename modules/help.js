const Module = require('./module');

class Help extends Module{
    constructor(database, translation, element){
        super(database, translation, element);
    }

    initialize(){

    }
    
    async execute(playerName, message, target, parameter){
        try{
            switch(message){
                case "!help":
                    if(this.isRunning){
                        return await this.buildMessage(); 
                    } else return this.translation.noHelp;
                case "!helpstart":
                    if("#" + playerName.toLowerCase() === target.toLowerCase()){
                        return this.start();
                    } else return this.translation.startError;
                case "!helpstop":
                    if("#" + playerName.toLowerCase() === target.toLowerCase()){
                        return this.stop();
                    } else return this.translation.stopError;
                case "!helpclear":
                    if("#" + playerName.toLowerCase() === target.toLowerCase()){
                        return this.clear();
                    } else return this.translation.clearError;
            }     
        } catch(ex){
            console.error(`ERROR [LOOT]`, ex);
        }   
    }

    clear(){
        return this.translation.clear;
    }

    async callMessage(){
        var message = "";
        if(this.isRunning){                    
            message = await this.buildMessage();
        }
        return message;
    }

    async buildMessage(){
        var result = `${this.translation.startText} `;
        try{
            var module_donate = (await this.database.sequelize.models.module_donate.findOne()).dataValues;
            var module_key = (await this.database.sequelize.models.module_key.findOne()).dataValues;
            var module_time = (await this.database.sequelize.models.module_time.findOne()).dataValues;
            var module_support = (await this.database.sequelize.models.module_support.findOne()).dataValues;
            var module_loot = (await this.database.sequelize.models.module_loot.findOne()).dataValues;
            var module_help = (await this.database.sequelize.models.module_help.findOne()).dataValues;
            var module_administration = (await this.database.sequelize.models.module_administration.findOne()).dataValues;

            if(module_donate) result += `${module_donate.help} `;
            if(module_key)result += `${module_key.help} `;
            if(module_time)result += `${module_time.help} `;
            if(module_support)result += `${module_support.help} `;
            if(module_loot)result += `${module_loot.help} `;
            if(module_help)result += `${module_help.help} `;
            if(module_administration)result += `${module_administration.help} `;
        } catch (ex){
            console.error(`ERROR`, ex);
        }
        return result;
    }
}

module.exports = Help