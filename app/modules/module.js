var path = require('path');

class Module {
    constructor(translation, element, language){
        this.element = element;
        this.language = language;
        this.translation = translation;
        this.lastRun = Date.now();
        this.basicTranslation = require(path.join(__dirname, '../language/say/' + language + '.json'));
    }

    isOwner(target, playerName){
        try{
            if("#" + playerName.toLowerCase() === target.toLowerCase())
                return true;
        } catch (ex){
            console.error(`ERR: is not a owner`, ex);
        }
        return false;
    }

    stop(){
        if(this.element.isActive){
            this.element.isActive = false;
            this.element.save();
            return this.basicTranslation.stop;
        }
        return this.basicTranslation.alreadyStopped;
    }

    start(){
        if(!this.element.isActive){
            this.element.isActive = true;
            this.element.save();
            this.lastRun = Date.now();
            return this.basicTranslation.start;
        }
        return this.basicTranslation.alreadyStarted;
    }

    execute(channel, playerName, message, target, parameter, command){
        try{
            switch(message){
                case `!${command}start`:
                    if(this.isOwner(target, playerName))
                        return this.start();
                    else return this.basicTranslation.startError;
                case `!${command}stop`:
                    if(this.isOwner(target, playerName))
                        return this.stop();
                    else return this.basicTranslation.stopError;
                case `!${command}help`:
                    if(this.isOwner(target, playerName)){
                        if(parameter){
                            this.element.help = parameter;
                            this.element.save();
                            return `${this.basicTranslation.textChanged} ${this.element.help}`;
                        } else return this.basicTranslation.noParameter;
                    } else return this.basicTranslation.changeError;
                case `!${command}interval`:
                    if(this.isOwner(target, playerName)){
                        if(!isNaN(parameter)){
                            this.element.minutes = parseInt(parameter);
                            this.element.save();
                            return `${this.basicTranslation.intervalChanged} ${this.element.minutes}`;
                        } else return this.basicTranslation.noParameter;
                    } else return this.basicTranslation.changeError;
            }     
        } catch(ex){
            console.error(`ERROR [LOOT]`, ex);
        } 
    }
}

module.exports = Module