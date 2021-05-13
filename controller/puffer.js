class Puffer {
    constructor(client, channel){
        this.messages = [];
        this.interval(client, channel)
    }

    addMessage(message){
        console.log(`MSG PUSH ${message}`);
        this.messages.push(message);
    }

    interval(client, channel){
        setInterval(
            () => {
                try{
                    if(this.messages.length > 0){
                        var message = this.messages.shift();
                        console.log(`MSG SHIFT ${message}`);
                        client.say(channel.name, message);
                    } 
                } catch (ex){
                    console.error(`ERR: build`, ex);
                }
            },
            1000 * 1.2 // 1.2 Sekunde(n)
        ); 
    }
}

module.exports = Puffer