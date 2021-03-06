const Module = require('./module');

class Say extends Module {
    constructor(translation, element, channelName, language){
        super(translation, element, language);
        this.channelName = channelName;
    }

    initialize(channel){

    }
    
    execute(channel, playerName, message, target, parameter){
        try{
            switch(message){
                case `!${this.element.command}`:
                    if(this.element.isActive)
                        return this.element.text;  
                    else return this.translation.notActive;
                case `!${this.element.command}text`:
                    if(this.isOwner(target, playerName)){
                        if(parameter && parameter.length > 0){
                            this.element.text = parameter;
                            this.element.isActive = true;
                            this.element.save();
                            return `${this.translation.textChanged} ${this.element.text}`;
                        } else return this.translation.noParameter;
                    } else return this.translation.changeError;
                    case `!${this.element.command}help`:
                        if(this.isOwner(target, playerName)){
                            if(parameter){
                                this.element.help = parameter;
                                this.element.save();
                                return `${this.translation.textChanged} ${this.element.help}`;
                            } else return this.translation.noParameter;
                        } else return this.translation.changeError;
                    case `!${this.element.command}interval`:
                        if(this.isOwner(target, playerName)){
                            if(!isNaN(parameter)){
                                this.element.minutes = parseInt(parameter);
                                this.element.save();
                                return `${this.translation.intervalChanged} ${this.element.minutes}`;
                            } else return this.translation.noParameter;
                        } else return this.translation.changeError;
                case `!${this.element.command}start`:
                    if(this.isOwner(target, playerName))
                        return this.start();
                    else return this.translation.startError;
                case `!${this.element.command}stop`:
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
        if(this.element.isActive){                    
            message = this.element.text;
        }
        return message;
    }
}

module.exports = Say