const Module = require('./module');

class Administration extends Module {
    constructor(database, translation, element, channel){
        super(database, translation, element);
        this.channel = channel;
    }
    
    initialize(){

    }

    execute(playerName, message, target, parameter){
        switch(message){
            case "!adminstart":
                if("#" + playerName.toLowerCase() === target.toLowerCase()){
                    return this.adminStart();
                } else return this.translation.startError;
            case "!adminstop":
                if("#" + playerName.toLowerCase() === target.toLowerCase()){
                    return this.adminStop();
                } else return this.translation.stopError;
        }       
    }
 
    adminStart(){
        if(this.channel && !this.channel.isActive){
            this.channel.isActive = true;
            return this.translation.start;
        } else return this.translation.startExists;
    }

    adminStop(){
        if(this.channel && this.channel.isActive){
            this.channel.isActive = false;
            return this.translation.stop;
        } else return this.translation.stopExists;
    }
}

module.exports = Administration