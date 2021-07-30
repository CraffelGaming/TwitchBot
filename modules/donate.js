const Module = require('./module');

class Donate extends Module {
    constructor(translation, element){
        super(translation, element);
        this.donationCurrent = 0;
        this.donationUser = [];
    }

    initialize(channel){
        
    }
    
    execute(channel, playerName, message, target, parameter){
        try{
            switch(message){
                case "!donate":
                    if(this.isRunning){
                        const state = this.countDonation(playerName);
                        switch(state){
                            case 1:
                                return `${this.translation.thanks} ${playerName}! ${this.translation.alreadySpend}`;
                            case 2: 
                                return `${this.translation.thanks} ${playerName}! ${this.translation.donationStatusNew}: ${this.donationCurrent}€ ${this.translation.ofMaximum} ${this.element.donationMax}€`;
                            default:
                                return `${this.translation.thanks} ${playerName}!, ${this.translation.donationLimitReached}`;
                        } 
                    } else return this.translation.noDonation;
                case "!donatemax":
                    if(this.isOwner(target, playerName)){
                        if(!isNaN(parameter)){
                            this.element.donationMax = parameter;
                            this.element.save();
                            return `${this.translation.donationLimitChanged} ${this.element.donationMax}€`;
                        } else return this.translation.notANumber;
                    } else return this.translation.donationLimitChangeError;
                case "!donatedestination":
                    if(this.isOwner(target, playerName)){
                        if(parameter && parameter.length > 0){
                            this.element.destination = parameter;
                            this.element.save();
                            return `${this.translation.donationDestinationChanged} ${this.element.destination}`;
                        } else return this.translation.noDonationParameter;
                    } else return this.translation.donationDestinationError;
                case "!donatestart":
                    if(this.isOwner(target, playerName))
                        return this.start();
                    else return this.translation.startError;
                case "!donatestop":
                    if(this.isOwner(target, playerName))
                        return this.stop();
                    else return this.translation.stopError;
                case "!donateclear":
                    if(this.isOwner(target, playerName))
                        return this.clear(channel);
                    else return this.translation.clearError;
            }     
        } catch(ex){
            console.error(`ERROR [LOOT]`, ex);
        }  
    }
    
    clear(channel){
        this.donationCurrent = 0;
        this.donationUser = [];
        return this.translation.clear;
    }

    countDonation (playerName) {
        if(this.donationCurrent < this.element.donationMax){     
            if(!this.donationUser.includes(playerName))  {
                ++this.donationCurrent;
                this.donationUser.push(playerName);
                return 2;
            } else return 1;
        } else return 0;
    }

    callMessage(channel){ 
        var message = "";
        if(this.isRunning){                    
            message = `${this.translation.donationInformation} ${this.element.destination}. (${this.translation.ofMaximum}: ${this.element.donationMax}€). ${this.translation.donationStatus}: ${this.donationCurrent}€ ${this.translation.ofMaximum} ${this.element.donationMax}€`;  
        }
        return message;
    }    
}

module.exports = Donate