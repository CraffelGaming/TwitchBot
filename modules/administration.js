const Module = require('./module');

class Administration extends Module {
    constructor(translation, element, language){
        super(translation, element, language);
    }
    
    initialize(channel){

    }

    execute(channel, playerName, message, target, parameter){
        switch(message){
            case "!adminstart":
                if(this.isOwner(target, playerName))
                    return this.adminStart(channel);
                else return this.basicTranslation.startError;
            case "!adminstop":
                if(this.isOwner(target, playerName))
                    return this.adminStop(channel);
                else return this.basicTranslation.stopError;
        }       
    }
 
    adminStart(channel){
        if(channel && !channel.isActive){
            channel.isActive = true;
            channel.save();
            return this.basicTranslation.start;
        } else return this.basicTranslation.startExists;
    }

    adminStop(channel){
        if(channel && channel.isActive){
            channel.isActive = false;
            channel.save();
            this.modulesStop(channel);
            return this.basicTranslation.stop;
        } else return this.basicTranslation.stopExists;
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