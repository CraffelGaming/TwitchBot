class Module {
    constructor(translation, element){
        this.isRunning = false;
        this.element = element;
        this.translation = translation;
        this.lastRun = Date.now();
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
        if(this.isRunning){
            this.isRunning = false;
            return this.translation.stop;
        }
        return this.translation.alreadyStopped;
    }

    start(){
        if(!this.isRunning){
            this.isRunning = true;
            this.lastRun = Date.now();
            return this.translation.start;
        }
        return this.translation.alreadyStarted;
    }
}

module.exports = Module