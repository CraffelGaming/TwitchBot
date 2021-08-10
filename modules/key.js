const Module = require('./module');

class Key extends Module{
    constructor(translation, element, language){
        super(translation, element, language);
        this.keys = [];
        this.keyNext = 0;
    }

    async initialize(channel){
        this.keys = await channel.database.sequelize.models.key.findAll();  
    }

    async execute(channel, playerName, message, target, parameter){
        var result = super.execute(channel, playerName, message, target, parameter, "key");
        if(result) return result;

        try{
            switch(message){
                case "!helpclear":
                    if(this.isOwner(target, playerName))
                        return await this.clear(channel);
                    else return this.basicTranslation.clearError;
            }     
        } catch(ex){
            console.error(`ERROR [LOOT]`, ex);
        }       
    }

    async clear(channel){
        this.keys = await channel.database.sequelize.models.key.findAll();  
        this.keyNext = 0;
        return this.basicTranslation.clear;
    }

    callMessage(channel){
        var message = "";
        if(this.keys != null && this.element.isActive){
            if(this.keyNext < this.keys.length){
                console.log(`${this.translation.free} ${this.keys[this.keyNext].dataValues.name} ${this.translation.key}: ${this.keys[this.keyNext].dataValues.key}.`);
                message = `Gratis ${this.keys[this.keyNext].dataValues.name} Key: ${this.keys[this.keyNext].dataValues.key}.`;
                ++this.keyNext;
            }
        }
        return message;
    }
}

module.exports = Key