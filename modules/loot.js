const Module = require('./module');

Array.prototype.min = function(propertySelector) { return Math.min(...this.map(propertySelector)) };
Array.prototype.max = function(propertySelector) { return Math.max(...this.map(propertySelector)) };

class Loot extends Module{
    constructor(database, translation, element){
        super(database, translation, element);

        this.players = [];
        this.items = [];
        this.locations = [];
        this.actions = [];
        this.endings = [];
    }

    async initialize(){
        this.items = await this.database.sequelize.models.loot_object.findAll();
        this.locations = await this.database.sequelize.models.loot_location.findAll();
        this.actions = await this.database.sequelize.models.loot_action.findAll();
        this.endings = await this.database.sequelize.models.loot_ending.findAll();
    }
    
    execute(playerName, message, target, parameter){    
        try{
            switch(message){
                case "!loot":
                    if(this.isRunning)
                        return this.newPlayer(playerName);
                    else return this.translation.noAdventure;
                case "!inventory":
                    return this.showInventory(playerName, parameter);
                case "!steal":
                    if(this.isRunning)
                        return this.stealItem(playerName, parameter);
                    else return this.translation.noAdventure;
                case "!give":
                    if(this.isRunning)
                        return this.giveItem(playerName, parameter);
                    else return this.translation.noAdventure;
                case "!find":
                    if(this.isRunning)
                        return this.findItem(playerName, parameter);
                    else return this.translation.noAdventure;
                case "!leave":
                    if(this.isRunning)
                        return this.leavePlayer(playerName);
                    else return this.translation.noAdventure;
                case "!lootclear":
                    if("#" + playerName.toLowerCase() === target.toLowerCase()){
                        return this.clear()
                    } else return this.translation.clearresetError;
                case "!lootstart":
                    if("#" + playerName.toLowerCase() === target.toLowerCase()){
                        return this.start()
                    } else return this.translation.startError;
                case "!lootstop":
                    if("#" + playerName.toLowerCase() === target.toLowerCase()){
                        return this.stop()
                    } else return this.translation.stopError;
            }
        } catch(ex){
            console.error(`ERROR [LOOT]`, ex);
        }
    }

    leavePlayer(playerName, parameter){
        var playerIndex = this.players.findIndex(x => x.name === playerName);
        if(playerIndex > -1){
            this.players.splice(playerIndex, 1);
            return `${playerName}, ${this.translation.leftAdventure}`;  
        } else return `${playerName}, ${this.translation.noParticipation}`;  
    }

    findItem(playerName, parameter){
        var player = this.players.find(x => x.name === playerName);
        if(player != undefined){
            for(var i = 0; i < this.players.length; i++){
                for(var j = this.players[i].items.length - 1;j >= 0 ; j--){    
                    if(this.players[i].items[j].handle == parameter){
                        return `${this.translation.item} ${this.players[i].items[j].value} ${this.translation.owns} ${this.players[i].name}`;
                    }
                }
            }
        } else return `${playerName}, ${this.translation.noParticipation}`;  

        var item = this.items.find(x => x.handle == parameter);
        if(item != undefined){
            return `${item.value} ${this.translation.notFound}`;  
        } else {
            return this.translation.itemNotExists;  
        }     
    }

    giveItem(playerName, parameter){
        var player = this.players.find(x => x.name === playerName);
        var options = this.getParameterPlayerAndItem(parameter);

        if(player != undefined){
            if(player.items != undefined){
                var item = player.items.find(x => x.handle === options.itemHandle);
                var itemIndex = player.items.findIndex(x => x.handle === options.itemHandle);

                if(item != undefined){
                    if(options.player != undefined){
                        if(player.name.toLowerCase() === options.player.name.toLowerCase()){
                            return `${playerName} ${this.translation.giveSelf}`;  
                        }

                        player.items.splice(itemIndex, 1);
                        options.player.items.push(item);
                        return `${playerName} ${this.translation.has} ${options.playerName} ${item.value} ${this.translation.give}.`;  
                    } else return `${playerName}, ${this.translation.noPlayer1} ${options.playerName} ${this.translation.noPlayer2}`;  
                }
                else {
                    item = this.items.find(x => x.handle === options.itemHandle);
                    if(item != undefined){
                        return `${playerName}, ${this.translation.notOwner} ${item.value} ${this.translation.not}.`;  
                    } else {
                        return `${playerName}, ${this.translation.itemNotExists}`;  
                    } 
                }
            }      
            else return `${playerName}, ${this.translation.noItemToGive}`;  
        }
        else return `${playerName}, ${this.translation.noParticipation}`;  
    }

    stealItem(playerName, parameter){
        var options = this.getParameterPlayerAndItem(parameter);
        var failedNumber = 0;
        var randomIndex = 0;
        var randomItem = {};

        if(this.players.length > 0){
            var player = this.players.find(x => x.name === playerName);
            if(player != undefined){
                var now = Date.now();
                var difference = Math.floor((now - player.lastSteal) / 1000 / 60);
                var rest = difference - this.element.stealTimeout;
                if(rest > -1){
                    player.lastSteal = now;

                    if(!options.player && options.itemHandle == -1){
                        options.player = this.getAnotherPlayer(player, 2);
                    }

                    if(options.player != null){
                        if(options.player.name == player.name){
                            if(player.items.length > 0){
                                return `${player.name} ${this.translation.stealSelf}`;
                            } else {
                                return `${player.name} ${this.translation.stealSelf2}`;
                            }
                        }
                        if(options.player.items.length > 0){
                            if(options.itemHandle > -1){
                                failedNumber = this.randomNumber(1, 2);
                            } else failedNumber = this.randomNumber(1, 10);
                           
                            if(failedNumber == 1 && this.players.length > 1 && player.items.length > 0){
                                randomIndex = this.randomNumber(0, player.items.length - 1);
                                randomItem = player.items[randomIndex];

                                player.items.splice(randomIndex, 1);
                                options.player.items.push(randomItem);
                                return `${player.name} ${this.translation.stealCaught1} ${options.player.name} ${this.translation.stealCaught2}. ${this.translation.stealCaught3} ${randomItem.value} ${this.translation.lost}.`;
                            } else {
                                if(options.itemHandle > -1){
                                    randomIndex = options.player.items.findIndex(x => x.handle === options.itemHandle);
                                    randomItem = options.player.items.find(x => x.handle === options.itemHandle);
                                } else {
                                    randomIndex = this.randomNumber(0, options.player.items.length - 1);
                                    randomItem = options.player.items[randomIndex];
                                }
                                
                                if(randomIndex > -1){
                                    options.player.items.splice(randomIndex, 1);
                                    player.items.push(randomItem);
                                    return `${player.name} ${this.translation.has} ${options.player.name} ${this.translation.stolen} ${randomItem.value} ${this.translation.get}.`;
                                } else {
                                    return `${options.player.name} ${this.translation.dontHaveThisItem}`;
                                }

                            }
                        } else return `${player.name} ${this.translation.tried} ${options.player.name} ${this.translation.nothingFound1} ${this.translation.nothingFound2}`;
                    } else return `${player.name} ${this.translation.dontFindAPlayer}`;
                } else {
                    rest *= -1;
                    return `${player.name} ${this.translation.noPower} ${rest} ${this.translation.minutes}.`;
                }
            } else return `${playerName}, ${this.translation.noParticipation}`;      
        } else return `${playerName}, ${this.translation.noParticipation}`;  
    }
    
    clear(){
        this.players = [];
        return this.translation.clear;
    }

    newPlayer(playerName){
        if(!this.players.some(x => x.name === playerName)){          
            var startIndex = 0;

            if(this.players.length > 0){
                startIndex = this.players.min(x => x.items.length + x.startIndex);
            } 

            var player = {name: playerName, startIndex: startIndex, items: [], lastSteal: Date.now()};
            this.players.push(player);
            console.log(`NEW PLAYER [LOOT]: ${player.name}-${player.items.length}+${player.startIndex}`);
            return `${playerName} ${this.translation.joinedAdventure}`;
        } else return `${playerName} ${this.translation.alreadyJoinedAdventure}`;
    }

    showInventory(playerName, parameter){
        var items = [];
        var inventoryFrom = playerName;

        if(parameter.length > 0){
            inventoryFrom = parameter;
        }

        if(this.players.length > 0){
            var player = this.players.find(x => x.name === inventoryFrom);
            if(player != undefined){
                if(player.items.length > 0){
                    for(var i = 0;i < player.items.length; i++){
                         items.push(player.items[i].value + ' [' + player.items[i].handle + ']');
                    }
                    return `${inventoryFrom} ${this.translation.hasItems}: ${items.join(', ')}`;
                } else {
                    return `${inventoryFrom} ${this.translation.noItems}`;
                }
            } else {
                return `${inventoryFrom}, ${this.translation.noParticipation}`;
            }
        } else return `${inventoryFrom}, ${this.translation.noParticipation}`;
    }

    callMessage(){
        var message = "";
        if(this.players.length > 0 && this.isRunning){                    
            var minimumIndex = this.players.min(x => x.items.length + x.startIndex);    
            var minimumPlayers = this.players.filter(x => x.items.length + x.startIndex === minimumIndex);     
            var player = minimumPlayers[this.randomNumber(0, minimumPlayers.length - 1)];     
            var location = this.locations[this.randomNumber(0, this.locations.length - 1)];
            var action = this.actions[this.randomNumber(0, this.actions.length - 1)];    
            var item = this.items[this.randomNumber(0, this.items.length - 1)];    
            var endingActive = this.randomNumber(1, 10)      
            console.log(`PLAYER [LOOT]: ${player.name}-${player.items.length}+${player.startIndex}`);

            if(endingActive == 1 && this.players.length > 1){
                message = this.collectItemSpecial(player, action, location, item);
            } else message = this.collectItem(player, action, location, item);
        }
        return message;
    }

    getAnotherPlayer(player, state){  
        var players = this.players.filter(x => x.name != player.name);

        switch(state){
            case 1:
                console.log(`ANOTHER PLAYER MAX`);
                var minimumIndex = players.min(x => x.items.length + x.startIndex);  
                players = players.filter(x => x.items.length + x.startIndex === minimumIndex); 
                break;
            case 2:
                console.log(`ANOTHER PLAYER MIN`);
                var maximumIndex = players.max(x => x.items.length + x.startIndex);  
                players = players.filter(x => x.items.length + x.startIndex === maximumIndex); 
                break;
        }
           
        return players[this.randomNumber(0, players.length - 1)];
    }

    collectItemSpecial(player, action, location, item){
        var ending = this.endings[this.randomNumber(0,this.endings.length - 1)];
        var receiver = this.getAnotherPlayer(player, 1);

        if(receiver != null){
            switch(ending.mode){
                case 1:
                        this.deleteItem(item);
                        player.items.push(item);
                    break;
                case 2:
                    this.deleteItem(item);
                    receiver.items.push(item);
                    break;
            }
            return `${player.name} ${action.value} ${location.value} ${item.value} ${ending.value} ${receiver.name}`;
        } else return this.collectItem(action, location, item);
    }

    collectItem(player, action, location, item){
        this.deleteItem(item);
        player.items.push(item);
        console.log( `${player.name} ${action.value} ${location.value} ${item.value}`);
        return `${player.name} ${action.value} ${location.value} ${item.value}`; 
    }

    deleteItem(item){
        var isDeleted = false;

        for(var i = 0; i < this.players.length; i++){
            for(var j = this.players[i].items.length - 1;j >= 0 ; j--){    
                if(this.players[i].items[j].value === item.value){
                    console.log(`REMOVED [LOOT]: ${this.players[i].items[j].value}-${this.players[i].items.length}+${this.players[i].startIndex}`);
                    this.players[i].items.splice(j, 1);
                    isDeleted = true;
                    break;
                }
                if(isDeleted){
                    break;
                }
            }
        }
    }

    getParameterPlayerAndItem(parameter){
        var result = {};
        result.playerName= "";
        result.player = undefined;
        result.itemHandle = -1;
        result.item = undefined;

        if(parameter.indexOf('@') > -1){
            result.playerName = parameter.substring(parameter.indexOf('@') + 1, parameter.length);
            result.player = this.players.find(x => x.name.toLowerCase() === result.playerName.toLowerCase());
            result.itemHandle = parseInt(parameter.substring(0, parameter.indexOf('@')).trim()); 
            result.item = this.items.find(x => x.handle === result.itemHandle);
        }
        
        return result;
    }

    randomNumber(min, max) { 
        var random = Math.floor(Math.random() * (max - min + 1) + min);
        console.log(`new random number ${random} between ${min} and ${max}`);
        return random;
    }
}

module.exports = Loot