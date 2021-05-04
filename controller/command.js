class Command {
    constructor(channel, target, context, message){
        this.commandName =  '';
        this.parameter = '';
        this.target = target;
        this.context = context;
        this.channel = channel;

        if(message.indexOf(':') > -1){
            this.parameter = message.substring(message.indexOf(':') + 1, message.length).trim();
            this.commandName = message.substring(0, message.indexOf(':')).trim().toLowerCase();
        } else if(message.indexOf('@') > -1){
            this.parameter = message.substring(message.indexOf('@') + 1, message.length).trim();
            this.commandName = message.substring(0, message.indexOf('@')).trim().toLowerCase();
        } else {
            this.commandName = message.trim().toLowerCase();
        }
    }

    async execute(){
        try{
            for (var item of Object.values(this.channel.commands)) {
                if(item.command == this.commandName){
                    console.log(`* Executed command ${item.command} for module ${item.name} on channel ${this.target} with parameter ${this.parameter}`); 
                    return await this.channel.execute(this.target, item.name, item.command, this.context['display-name'], this.parameter);   
                }
            }
        }  catch (ex){
            console.error(`ERROR [${this.commandName}]`, ex);
        }
    }
}

module.exports = Command