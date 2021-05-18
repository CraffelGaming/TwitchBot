const Module = require('./module');

class Key extends Module{
    constructor(translation, element){
        super(translation, element);
        this.keys = [];
        this.keyNext = 0;
    }

    async initialize(channel){
        this.keys = await channel.database.sequelize.models.key.findAll();  
    }

    async execute(channel, playerName, message, target, parameter){
        try{
            switch(message){
                case "!keystart":
                    if(this.isOwner(target, playerName))
                        return this.start();
                    else return this.translation.startError;
                case "!keystop":
                    if(this.isOwner(target, playerName))
                        return this.stop();
                    else return this.translation.stopError;
                case "!helpclear":
                    if(this.isOwner(target, playerName))
                        return await this.clear(channel);
                    else return this.translation.clearError;
            }     
        } catch(ex){
            console.error(`ERROR [LOOT]`, ex);
        }       
    }

    async clear(channel){
        this.keys = await channel.database.sequelize.models.key.findAll();  
        this.keyNext = 0;
        return this.translation.clear;
    }

    callMessage(channel){
        var message = "";
        if(this.keys != null && this.isRunning){
            if(this.keyNext < this.keys.length){
                console.log(`${this.translation.free} ${this.keys[this.keyNext].dataValues.name} ${this.translation.key}: ${this.keys[this.keyNext].dataValues.key}.`);
                //message = `Gratis ${this.keys[this.keyNext].dataValues.name} Key: ${this.keys[this.keyNext].dataValues.key}.`;
                ++this.keyNext;
            }
        }
        return message;
    }
}

module.exports = Key