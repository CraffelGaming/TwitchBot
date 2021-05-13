class Module {
    constructor(translation, element){
        this.isRunning = false;
        this.element = element;
        this.translation = translation;
    }

    isOwner(target, playerName){
        try{
            if("#" + playerName.toLowerCase() === target.toLowerCase())
                return true;
        } catch (ex){
            console.error(`ERR: loot - is owner`, ex);
        }
        return false;
    }

    stop(){
        if(this.isRunning){
            this.isRunning = false;
            return true;
        }
        return false;
    }

    start(){
        if(!this.isRunning){
            this.isRunning = true;
            return true;
        }
        return false;
    }
}

module.exports = Module