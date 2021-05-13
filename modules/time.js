const Module = require('./module');

class Time extends Module {
    constructor(translation, element, channelName){
        super(translation, element);
        this.channelName = channelName;
        this.startTime = Date.now();
    }

    initialize(channel){

    }
    
    execute(channel, playerName, message, target, parameter){
        try{
            switch(message){
                case "!time":
                    if(this.isRunning){
                        return this.getStreamingTime();  
                    } else return this.translation.noTime;
                case "!timeclear":
                    if("#" + playerName.toLowerCase() === target.toLowerCase()){
                        return this.clear(channel);
                    } else return this.translation.resetError;
                case "!timestart":
                    if("#" + playerName.toLowerCase() === target.toLowerCase()){
                        return this.start();
                    } else return this.translation.startError;
                case "!timestop":
                    if("#" + playerName.toLowerCase() === target.toLowerCase()){
                        return this.stop();
                    } else return this.translation.stopError;
            }     
        } catch(ex){
            console.error(`ERROR [LOOT]`, ex);
        } 

        switch(message){

        }     
    }

    async clear(channel){
        this.startTime = Date.now();
        return this.translation.clear;
    }

    async callMessage(channel){
        var message = "";
        if(this.isRunning){                    
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