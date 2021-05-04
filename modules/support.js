const Module = require('./module');

class Support extends Module {
    constructor(database, translation, element){
        super(database, translation, element);
    }

    initialize(){
        
    }
    
    execute(playerName, message, target, parameter){
        try{
            switch(message){
                case "!support":
                    if(this.isRunning){
                        return this.generateMessage();
                    } else return this.translation.noSupport;
                case "!supportstart":
                    if("#" + playerName.toLowerCase() === target.toLowerCase()){
                        return this.start();
                    } else return this.translation.startError;
                case "!supportstop":
                    if("#" + playerName.toLowerCase() === target.toLowerCase()){
                        return this.stop();
                    } else return this.translation.stopError;
                case "!supportclear":
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

    callMessage(){
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