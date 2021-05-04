const Module = require('./module');

class Key extends Module{
    constructor(database, translation, element){
        super(database, translation, element);
        this.keys = [];
        this.keyNext = 0;
    }

    async initialize(){
        this.keys = await this.database.sequelize.models.key.findAll();  
    }

    async execute(playerName, message, target, parameter){
        try{
            switch(message){
                case "!keystart":
                    if("#" + playerName.toLowerCase() === target.toLowerCase()){
                        return this.start();
                    } else return this.translation.startError;
                case "!keystop":
                    if("#" + playerName.toLowerCase() === target.toLowerCase()){
                        return this.stop();
                    } else return this.translation.stopError;
                case "!helpclear":
                    if("#" + playerName.toLowerCase() === target.toLowerCase()){
                        return await this.clear();
                    } else return this.translation.clearError;
            }     
        } catch(ex){
            console.error(`ERROR [LOOT]`, ex);
        }       
    }

    async clear(){
        this.keys = await this.database.sequelize.models.key.findAll();  
        this.keyNext = 0;
        return this.translation.clear;
    }

    callMessage(){
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