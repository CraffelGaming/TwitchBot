const Module = require('./module');

class Discord extends Module {
    constructor(translation, element, channelName){
        super(translation, element);
        this.channelName = channelName;
    }

    initialize(channel){

    }
    
    execute(channel, playerName, message, target, parameter){
        try{
            switch(message){
                case "!discord":
                    if(this.isRunning)
                        return this.getDiscordLink();  
                    else return this.translation.noDiscord;
                case "!discordlink":
                    if(this.isOwner(target, playerName)){
                        if(parameter && parameter.length > 0){
                            this.element.link = parameter;
                            return `${this.translation.linkChanged} ${this.element.link}`;
                        } else return this.translation.noLinkParameter;
                    } else return this.translation.linkError;
                case "!discordstart":
                    if(this.isOwner(target, playerName))
                        return this.start();
                    else return this.translation.startError;
                case "!discordstop":
                    if(this.isOwner(target, playerName))
                        return this.stop();
                    else return this.translation.stopError;
            }     
        } catch(ex){
            console.error(`ERROR [LOOT]`, ex);
        }   
    }

    async callMessage(channel){
        var message = "";
        if(this.isRunning){                    
            message = this.getDiscordLink();
        }
        return message;
    }

    getDiscordLink() {
        console.log(this.element.link);
        return `${this.element.link}`;
    }
}

module.exports = Discord