const Module = require('./module');

class Support extends Module {
    constructor(translation, element){
        super(translation, element);
    }

    initialize(channel){
        
    }
    
    execute(channel, playerName, message, target, parameter){
        try{
            switch(message){
                case "!support":
                    if(this.isRunning)
                        return this.generateMessage();
                    else return this.translation.noSupport;
                case "!supportstart":
                    if(this.isOwner(target, playerName))
                        return this.start();
                    else return this.translation.startError;
                case "!supportstop":
                    if(this.isOwner(target, playerName))
                        return this.stop();
                    else return this.translation.stopError;
                case "!supportclear":
                    if(this.isOwner(target, playerName))
                        return this.clear(channel);
                    else return this.translation.clearError;
            }     
        } catch(ex){
            console.error(`ERROR [LOOT]`, ex);
        }  
    }

    clear(channel){
        return this.translation.clear;
    }

    callMessage(channel){
        var message = "";
        if(this.isRunning){                    
            message = this.generateMessage();
        }
        return message;
    }

    generateMessage(){
        return `${this.translation.streamer}: ${this.element.streamer}. ${this.translation.mods}: ${this.element.mods}.`;
    }
}

module.exports = Support