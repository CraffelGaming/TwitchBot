class Puffer {
    constructor(client, channel){
        this.messages = [];
        this.interval(client, channel)
    }

    addMessage(message){
        console.log(`MSG PUSH ${this.messages}`);
        this.messages.push(message);
    }

    interval(client, channel){
        setInterval(
            () => {
                if(this.messages.length > 0){
                    console.log(`MSG SHIFT ${this.messages}`);
                    client.say(channel.name, this.messages.shift());
                }  
            },
            1000 * 1.2 // 1.2 Sekunde(n)
        ); 
    }
}

module.exports = Puffer