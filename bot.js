const tmi = require('tmi.js');
const Channel = require('./controller/channel');
const Command = require('./controller/command');
const opts = require('./bot.json');

let channel = new Channel();
let client = {};

startup();

async function startup(){
  await channel.initialize();

  var channelList = await channel.getChannels()

  for (var channelItem of Object.values(channelList)) {
      opts.channels.push(channelItem.name.replace('#', ''));
  }

  console.log(opts);
  // Create a client with our options
  client = new tmi.client(opts);

  await channel.build(channelList, client);

  // Register our event handlers (defined below)
  client.on('message', onMessageHandler);
  client.on('connected', onConnectedHandler);
  client.on('disconnected', onDisconnectedHandler);

  // Connect to Twitch:
  client.connect();
}

// Called every time a message comes in
async function onMessageHandler (target, context, message, self) {
    if (self) { return; } // Ignore messages from the bot
    if(!message.trim().toLowerCase().startsWith('!')) { return; } // Ignore normal chat messages
    
    var command = new Command(channel, target, context, message);
    var response = await command.execute();
    
    if(!response) {return;}

    //PUFFER
    var channelItem = channel.channels.find(x => x.name === target)
    
    if(channelItem){
      channelItem.puffer.addMessage(response);
    }
    //client.say(target, response);
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}

async function onDisconnectedHandler(){
  // Connect to Twitch:
  client.connect();
}