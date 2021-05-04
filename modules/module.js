class Module {
    constructor(database, translation, element){
        this.isRunning = false;
        this.element = element;
        this.database = database;
        this.translation = translation;
    }

    stop(){
        if(this.isRunning){
            this.isRunning = false;
            return this.translation.stop;
        } else return this.translation.alreadyStopped;
    }

    start(){
        if(!this.isRunning){
            this.isRunning = true;
            return this.translation.start;
        } else return this.translation.alreadyStarted;
    }
}

module.exports = Module