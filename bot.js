const routes = require('./routes/index');
const api = require('./routes/api');
const tmi = require('tmi.js');
const Channel = require('./controller/channel');
const Command = require('./controller/command');
const opts = require('./bot.json');
const settings = require('./settings.json');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
const favicon = require('serve-favicon');

let channel = new Channel();
let client = {};

var express = require('express');
var app = express();

//session handler
app.use(session({
  'secret': settings.secret,
  'resave': true,
  'saveUninitialized': true
}))

app.disable('x-powered-by');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('trust proxy', 1);

app.use(favicon(path.join(__dirname, settings.favicon)));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', routes);
app.use('/api', api);
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
app.use('/popper', express.static(__dirname + '/node_modules/popper.js/dist'));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'));

app.set('port', settings.port);
app.set('channel', channel);
app.set('client', client);

var server = app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + server.address().port);
});

startup();

// start twitch bot
async function startup(){
  await channel.initialize();

  var channelList = await channel.getChannels()

  for (var channelItem of Object.values(channelList)) {
      opts.channels.push(channelItem.name.replace('#', ''));
  }

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