const Module = require('./module');

class Time extends Module {
    constructor(database, translation, element, channelName){
        super(database, translation, element);
        this.channelName = channelName;
        this.startTime = Date.now();
    }

    initialize(){

    }
    
    execute(playerName, message, target, parameter){
        try{
            switch(message){
                case "!time":
                    if(this.isRunning){
                        return this.getStreamingTime();  
                    } else return this.translation.noTime;
                case "!timeclear":
                    if("#" + playerName.toLowerCase() === target.toLowerCase()){
                        return this.clear();
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

    async clear(){
        this.startTime = Date.now();
        return this.translation.clear;
    }

    async callMessage(){
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