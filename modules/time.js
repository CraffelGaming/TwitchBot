const Module = require('./module');

class Time extends Module {
    constructor(translation, element, channelName, language){
        super(translation, element, language);
        this.channelName = channelName;
        this.startTime = Date.now();
    }

    initialize(channel){

    }
    
    execute(channel, playerName, message, target, parameter){
        var result = super.execute(channel, playerName, message, target, parameter, "time");
        if(result) return result;

        try{
            switch(message){
                case "!time":
                    if(this.element.isActive)
                        return this.getStreamingTime();  
                    else return this.translation.noTime;
                case "!timeclear":
                    if(this.isOwner(target, playerName))
                        return this.clear(channel);
                    else return this.basicTranslation.resetError;
            }     
        } catch(ex){
            console.error(`ERROR [LOOT]`, ex);
        }     
    }

    async clear(channel){
        this.startTime = Date.now();
        return this.basicTranslation.clear;
    }

    async callMessage(channel){
        var message = "";
        if(this.element.isActive){                    
            message = this.getStreamingTime();
        }
        return message;
    }

    getStreamingTime() {
        var now = Date.now();
        var difference = now - this.startTime;
        var streamingTime = new Date(difference).toISOString().substr(11, 8);
        return `${this.channelName} ${this.translation.streaming} ${streamingTime}`;
    }
}

module.exports = Time