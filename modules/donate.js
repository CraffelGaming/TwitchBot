const Module = require('./module');

class Donate extends Module {
    constructor(database, translation, element){
        super(database, translation, element);
        this.donationCurrent = 0;
        this.donationUser = [];
    }

    initialize(){
        
    }
    
    execute(playerName, message, target, parameter){
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
                    if("#" + playerName.toLowerCase() === target.toLowerCase()){
                        if(!isNaN(parameter)){
                            this.element.donationMax = parameter;
                            return `${this.translation.donationLimitChanged} ${this.element.donationMax}€`;
                        } else return this.translation.notANumber;
                    } else return this.translation.donationLimitChangeError;
                    case "!donatedestination":
                        if("#" + playerName.toLowerCase() === target.toLowerCase()){
                            if(parameter && parameter.length > 0){
                                this.element.destination = parameter;
                                return `${this.translation.donationDestinationChanged} ${this.element.destination}`;
                            } else return this.translation.noDonationParameter;
                        } else return this.translation.donationDestinationError;
                case "!donatestart":
                    if("#" + playerName.toLowerCase() === target.toLowerCase()){
                        return this.start();
                    } else return this.translation.startError;
                case "!donatestop":
                    if("#" + playerName.toLowerCase() === target.toLowerCase()){
                        return this.stop();
                    } else return this.translation.stopError;
                case "!donateclear":
                    if("#" + playerName.toLowerCase() === target.toLowerCase()){
                        return this.clear();
                    } else return this.translation.clearError;
            }     
        } catch(ex){
            console.error(`ERROR [LOOT]`, ex);
        }  
    }
    
    clear(){
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

    callMessage(){ 
        var message = "";
        if(this.isRunning){                    
            message = `${this.translation.donationInformation} ${this.element.destination}. (${this.translation.ofMaximum}: ${this.element.donationMax}€). ${this.translation.donationStatus}: ${this.donationCurrent}€ ${this.translation.ofMaximum} ${this.element.donationMax}€`;  
        }
        return message;
    }    
}

module.exports = Donate