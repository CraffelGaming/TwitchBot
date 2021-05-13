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
                if("#" + playerName.toLowerCase() === target.toLowerCase()){
                    return this.adminStart(channel);
                } else return this.translation.startError;
            case "!adminstop":
                if("#" + playerName.toLowerCase() === target.toLowerCase()){
                    return this.adminStop(channel);
                } else return this.translation.stopError;
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
            return this.translation.stop;
        } else return this.translation.stopExists;
    }
}

module.exports = Administration