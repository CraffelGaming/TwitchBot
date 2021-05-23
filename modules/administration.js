const Loot = require('./loot');
const Module = require('./module');

class Administration extends Module {
    constructor(translation, element){
        super(translation, element);
    }
    
    initialize(channel){

    }

    execute(channel, playerName, message, target, parameter){
        switch(message){
            case "!adminstart":
                if(this.isOwner(target, playerName))
                    return this.adminStart(channel);
                else return this.translation.startError;
            case "!adminstop":
                if(this.isOwner(target, playerName))
                    return this.adminStop(channel);
                else return this.translation.stopError;
        }       
    }
 
    adminStart(channel){
        if(channel && !channel.isActive){
            channel.isActive = true;
            return this.translation.start;
        } else return this.translation.startExists;
    }

    adminStop(channel){
        if(channel && channel.isActive){
            channel.isActive = false;
            this.modulesStop(channel);
            return this.translation.stop;
        } else return this.translation.stopExists;
    }

    modulesStop(channel){
        if(channel){
            for (var module of Object.values(channel.modules)){
                module.object.stop();
            }
        }
    }
}

module.exports = Administration