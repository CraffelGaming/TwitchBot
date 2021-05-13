const Module = require('./module');
const LootHeroItem = require('../model/loot/lootHeroItem');
const LootInventoryItem = require('../model/loot/lootInventoryItem');

Array.prototype.min = function(propertySelector) { return Math.min(...this.map(propertySelector)) };
Array.prototype.max = function(propertySelector) { return Math.max(...this.map(propertySelector)) };

class Loot extends Module{
    //#region Constructor
    constructor(translation, element){
        super(translation, element);
        this.isRunning = true;
        this.players = [];
        this.items = [];
        this.locations = [];
        this.actions = [];
        this.endings = [];
    }
    //#endregion

    //#region Initialize
    async initialize(channel){
        this.items = await channel.database.sequelize.models.loot_object.findAll();
        this.locations = await channel.database.sequelize.models.loot_location.findAll();
        this.actions = await channel.database.sequelize.models.loot_action.findAll();
        this.endings = await channel.database.sequelize.models.loot_ending.findAll();
        this.players = await channel.database.sequelize.models.loot_hero.findAll({where: {isActive: true}});

        for (var player of Object.values(this.players)) {
            player.startIndex = 0;
            player.items = await channel.database.sequelize.models.loot_inventory.findAll({where: {heroHandle: player.handle, isReload: true}});
        }

        for (var item of Object.values(this.items)) {
            item.isFound = false;
        }
    }
    //#endregion

    //#region Execute
    async execute(channel, playerName, message, target, parameter){    
        try{
            switch(message){
                case "!loot":
                    return await this.executeLoot(channel, playerName, message, target, parameter);
                case "!leave":
                    return await this.executeLeave(channel, playerName, message, target, parameter);
                case "!lootclear":
                    return await this.executeClear(channel, playerName, message, target, parameter);
                case "!lootstart":
                    return this.executeStart(channel, playerName, message, target, parameter);
                case "!lootstop":
                    return this.executeStop(channel, playerName, message, target, parameter);
                case "!inventory":
                    return this.showInventory(playerName, parameter);
                case "!steal":
                    return await this.executeSteal(channel, playerName, message, target, parameter);
                case "!give":
                    return await this.executeGive(channel, playerName, message, target, parameter);
                case "!find":
                    return this.executeFind(channel, playerName, message, target, parameter);
                case "!gold":
                    return this.showGold(playerName);
                case "!chest":
                    return await this.showChest(channel, playerName);
            }
        } catch(ex){
            console.error(`ERR: loot - general`, ex);
        }
    }
    async executeLoot(channel, playerName, message, target, parameter){
        if(this.isRunning)
            if(await this.newPlayer(channel, playerName))
                return `${playerName} ${this.translation.joinedAdventure}`;
            else return `${playerName} ${this.translation.alreadyJoinedAdventure}`;
        else return this.translation.noAdventure;
    }

    async executeLeave(channel, playerName, message, target, parameter){
        if(this.isRunning)
            if(await this.leavePlayer(playerName))
                return `${playerName}, ${this.translation.leftAdventure}`;  
            else return `${playerName}, ${this.translation.noParticipation}`
        else return this.translation.noAdventure;
    }

    async executeClear(channel, playerName, message, target, parameter){
        if(this.isOwner(target, playerName))
            if(await this.clear(channel))
                return this.translation.clear;
        return this.translation.clearresetError;
    }

    executeStop(channel, playerName, message, target, parameter){
        if(this.isOwner(target, playerName))
            if(this.stop())
                return this.translation.stop;
            else return this.translation.alreadyStopped;
        else return this.translation.stopError;
    }

    executeStart(channel, playerName, message, target, parameter){
        if(this.isOwner(target, playerName))
            if(this.start())
                return this.translation.start;
            else return this.translation.alreadyStarted;
        else return this.translation.startError;
    }

    async executeSteal(channel, playerName, message, target, parameter){
        if(this.isRunning)
            return await this.stealItem(channel, playerName, parameter);
        return this.translation.noAdventure;
    }

    async executeGive(channel, playerName, message, target, parameter){
        if(this.isRunning)
            return await this.giveItem(channel, playerName, parameter);
        return this.translation.noAdventure;
    }

    executeFind(channel, playerName, message, target, parameter){
        if(this.isRunning)
            return this.findItem(playerName, parameter);
        return this.translation.noAdventure;
    }
    //#endregion

    //#region Player
    async newPlayer(channel, playerName){
        try{
            if(!this.players.some(x => x.name === playerName)){  
                var hero = await LootHeroItem.get(channel.database.sequelize, playerName);
    
                hero.isActive = true;
                hero.items = [];
                
                if(this.players.length > 0){
                    hero.startIndex = this.players.min(x => x.items.length + x.startIndex);
                } else hero.startIndex = 0;
    
                await hero.save();
                this.players.push(hero);
                return true;
            }
        } catch (ex){
            console.error(`ERR: loot - new player`, ex);
        }
        return false;
    }

    async leavePlayer(playerName, parameter){
        var index = this.players.findIndex(x => x.name === playerName);
        if(index > -1){
            this.players[index].isActive = false;
            await this.players[index].save();
            this.players.splice(index, 1);
            return true;
        } else false;  
    }

    getAnotherPlayer(player, state){  
        var players = this.players.filter(x => x.name != player.name);

        switch(state){
            case 1:
                console.log(`INF another max player`);
                var minimumIndex = players.min(x => x.items.length + x.startIndex);  
                players = players.filter(x => x.items.length + x.startIndex === minimumIndex); 
                break;
            case 2:
                console.log(`INF another min player`);
                var maximumIndex = players.max(x => x.items.length + x.startIndex);  
                players = players.filter(x => x.items.length + x.startIndex === maximumIndex); 
                break;
        }
        return players[this.randomNumber(0, players.length - 1)];
    }
    //#endregion

    //#region Clear
    async clear(channel){
        try{
            for (var item of Object.values(this.items)) {
                item.isFound = false;
            }
            for (var player of Object.values(this.players)) {
                for (var element of Object.values(player.items)) {
                    element.isReload = false;
                    await element.save();
                }
                player.isActive = false;
                player.startIndex = 0;
                await player.save();
            }
            this.players = [];
            return true;
        } catch (ex){
            console.error(`ERR: loot - is owner`, ex);
        }
        return false;
    }
    //#endregion

    //#region Random
    randomNumber(min, max) { 
        var random = Math.floor(Math.random() * (max - min + 1) + min);
        console.log(`INF: new random number ${random} between ${min} and ${max}`);
        return random;
    }
    //#endregion

    //#region Call Message
    async callMessage(channel){
        var message = "";
        try{
            if(this.players.length > 0 && this.isRunning){                    
                var minimumIndex = this.players.min(x => x.items.length + x.startIndex);    
                var minimumPlayers = this.players.filter(x => x.items.length + x.startIndex === minimumIndex);     
                var player = minimumPlayers[this.randomNumber(0, minimumPlayers.length - 1)];     
                var location = this.locations[this.randomNumber(0, this.locations.length - 1)];
                var action = this.actions[this.randomNumber(0, this.actions.length - 1)];   
                var newItems = this.items.filter(x => !x.isFound);

                if(newItems.length > 0){
                    var item = newItems[this.randomNumber(0, newItems.length - 1)];    
                    var endingActive = this.randomNumber(1, 10); 
    
                    console.log(`INT: loot item: ${player.name}-${player.items.length}+${player.startIndex} remaining ${newItems.length}`);
                    if(endingActive == 1 && this.players.length > 1){
                        message = await this.collectItemSpecial(channel, player, action, location, item);
                    } else message = await this.collectItem(channel, player, action, location, item);
                    
                    message += await this.collectGold(player);
                }
            }
        } catch (ex){
            console.error(`ERR: loot - call message`, ex);
        }
        return message;
    }
    //#endregion

    //#region Gold
    async collectGold(hero){
        var gold = this.randomNumber(50, 150);
        var randomMultipler = this.randomNumber(1, 5);
        
        if(randomMultipler == 1)
            gold *= 2;
     
        gold *= hero.goldMultipler;
        hero.gold += gold;
        await hero.save();

        return ` (+ ${gold} ${this.translation.gold})`;
    }

    showGold(playerName){
        if(this.players.length > 0){
            var player = this.players.find(x => x.name === playerName);
            if(player != undefined){
                return `${this.translation.youHave} ${player.gold} ${this.translation.gold}`;
            } else return `${inventoryFrom}, ${this.translation.noParticipation}`;
        } else return `${inventoryFrom}, ${this.translation.noParticipation}`;
    }
    //#endregion

    //#region Inventory
    async addInventory(channel, hero, object){
        try{
            var element = hero.items.find(x => x.objectHandle === object.handle && x.heroHandle === hero.handle);

            if(element == null){
                element = await LootInventoryItem.get(channel.database.sequelize, hero, object);
                hero.items.push(element);
            }
            object.isFound = true;
            ++element.quantity;
            element.isReload = true;
            await element.save();  
           
        } catch (ex){
            console.error(`ERR: loot - add inventory`, ex);
        }
    }

    async removeInventory(channel, hero, object){
        try{
            var element = hero.items.find(x => x.objectHandle === object.handle && x.heroHandle === hero.handle);
            var elementIndex = hero.items.findIndex(x => x.objectHandle === object.handle && x.heroHandle === hero.handle);

            if(elementIndex > -1 && element != null){
                --element.quantity;
                if(element.quantity > 0)
                    await element.save();
                else await element.destroy();
                hero.items.splice(elementIndex, 1);
            }
        } catch (ex){
            console.error(`ERR: loot - add inventory`, ex);
        }
    }

    showInventory(playerName, parameter){
        var inventoryFrom = parameter.length > 0 ? parameter : playerName;

        if(this.players.length > 0){
            var player = this.players.find(x => x.name === inventoryFrom);
            if(player != undefined){
                var items = player.items.filter(x => x.heroHandle === player.handle);
                var result = [];
                if(items.length > 0){
                    for(var i = 0;i < items.length; i++){
                        var item = this.items.find(x => x.handle === items[i].objectHandle);
                        result.push(item.value + ' [' + item.handle + ']');
                    }
                    return `${inventoryFrom} ${this.translation.hasItems}: ${result.join(', ')}`;
                } else return `${inventoryFrom} ${this.translation.noItems}`;
            } else return `${inventoryFrom}, ${this.translation.noParticipation}`;
        } else return `${inventoryFrom}, ${this.translation.noParticipation}`;
    }
    //#endregion

    //#region Collect
    async collectItem(channel, player, action, location, item){
        await this.addInventory(channel, player, item);
        console.log(`INF: ${player.name} ${action.value} ${location.value} ${item.value}`);
        return `${player.name} ${action.value} ${location.value} ${item.value}`; 
    }
    
    async collectItemSpecial(channel, player, action, location, item){
        var ending = this.endings[this.randomNumber(0,this.endings.length - 1)];
        var receiver = this.getAnotherPlayer(player, 1);

        if(receiver != null){
            switch(ending.mode){
                case 1:
                    await this.addInventory(channel, player, item);
                    break;
                case 2:
                    await this.addInventory(channel, receiver, item);
                    break;
            }
            return `${player.name} ${action.value} ${location.value} ${item.value} ${ending.value} ${receiver.name}`;
        } else return this.collectItem(channel, player, action, location, item);
    }
    //#endregion

    //#region Find
    findItem(playerName, parameter){
        try{
            var player = this.players.find(x => x.name === playerName);
            if(player != undefined){
                for(var i = 0; i < this.players.length; i++){
                    for(var j = this.players[i].items.length - 1;j >= 0 ; j--){    
                        if(this.players[i].items[j].objectHandle == parameter){
                            var item = this.items.find(x => x.handle == parameter);
                            if(item != undefined){
                                return `${this.translation.item} ${item.value} ${this.translation.owns} ${this.players[i].name}`;
                            }
                        }
                    }
                }
            } else return `${playerName}, ${this.translation.noParticipation}`;  
    
            var item = this.items.find(x => x.handle == parameter);
            if(item != undefined)
                return `${item.value} ${this.translation.notFound}`;   
        } catch (ex){
            console.error(`ERR: loot - find item`, ex);
        }
        return this.translation.itemNotExists;  
    }
    //#endregion

    //#region Give
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

    async giveItem(channel, playerName, parameter){
        var player = this.players.find(x => x.name === playerName);
        var options = this.getParameterPlayerAndItem(parameter);

        if(player != undefined){
            if(player.items != undefined){
                var item = player.items.find(x => x.objectHandle === options.itemHandle);
                //var itemIndex = player.items.findIndex(x => x.objectHandle === options.itemHandle);

                if(item != undefined){
                    if(options.player != undefined){
                        if(player.name.toLowerCase() === options.player.name.toLowerCase()){
                            return `${playerName} ${this.translation.giveSelf}`;  
                        }

                        var element = this.items.find(x => x.handle == item.objectHandle);

                        if(element != undefined){
                            await this.addInventory(channel,options.player, element);
                            await this.removeInventory(channel,player, element);
                            return `${playerName} ${this.translation.has} ${options.playerName} ${element.value} ${this.translation.give}.`;  
                        }
                         
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
    //#endregion
    
    //#region Steal
    async stealItem(channel, playerName, parameter){
        var options = this.getParameterPlayerAndItem(parameter);
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
                            var steal = this.randomNumber(0, options.player.stealMultipler * 10);
                            var defence = this.randomNumber(0,player.defenceMultipler * 10);

                            if(steal < defence && this.players.length > 1 && player.items.length > 0){
                                randomIndex = this.randomNumber(0, player.items.length - 1);
                                randomItem = player.items[randomIndex];
                                var element = this.items.find(x => x.handle == randomItem.objectHandle);
                                if(element != undefined){
                                    await this.addInventory(channel, options.player, element);
                                    await this.removeInventory(channel, player, element);
                                    return `${player.name} ${this.translation.stealCaught1} ${options.player.name} ${this.translation.stealCaught2}. ${this.translation.stealCaught3} ${element.value} ${this.translation.lost}.`;
                                }
                            } else {
                                if(options.itemHandle > -1){
                                    randomIndex = options.player.items.findIndex(x => x.objectHandle === options.itemHandle);
                                    randomItem = options.player.items.find(x => x.objectHandle === options.itemHandle);
                                } else {
                                    randomIndex = this.randomNumber(0, options.player.items.length - 1);
                                    randomItem = options.player.items[randomIndex];
                                }
                                
                                if(randomIndex > -1){
                                    var element = this.items.find(x => x.handle == randomItem.objectHandle);
                                    if(element != undefined){
                                        await this.addInventory(channel, player, element);
                                        await this.removeInventory(channel, options.player, element);
                                        return `${player.name} ${this.translation.has} ${options.player.name} ${this.translation.stolen} ${element.value} ${this.translation.get}.`;
                                    }
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
    //#endregion

    //#region Chest
    async showChest(channel, playerName){
        var count = 0;

        if(this.players.length > 0){
            var player = this.players.find(x => x.name === playerName);
            if(player != undefined){
                var items = await channel.database.sequelize.models.loot_inventory.findAll({where: {heroHandle: player.handle}});

                for (var item of Object.values(items))
                    count += item.quantity

                return `${this.translation.treasure} ${count} ${this.translation.items}`
            } else return `${inventoryFrom}, ${this.translation.noParticipation}`;
        } else return `${inventoryFrom}, ${this.translation.noParticipation}`;
    }
    //#endregion
}

module.exports = Loot