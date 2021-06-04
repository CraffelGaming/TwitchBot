const routes = require('./routes/index');
const api = require('./routes/api');
const tmi = require('tmi.js');
const Channel = require('./controller/channel');
const Command = require('./controller/command');
const opts = require('./bot.json');
const settings = require('./settings.json');
const twitch = require('./twitch.json');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const https = require('https');
const http = require('http');
const fs = require('fs')
var path = require('path');

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
app.set('twitch', twitch);

if (fs.existsSync(path.join(__dirname, settings['key'])) && fs.existsSync(path.join(__dirname, settings['cert']))){
  https.createServer({
      key: fs.readFileSync(path.join(__dirname, settings['key'])),
      cert: fs.readFileSync(path.join(__dirname, settings['cert']))
  }, app)
      .listen(app.get('port'), function () {
        console.log('Express server listening on port ' + app.get('port'));
      })
} else {
  http.createServer(app)
      .listen(app.get('port'), function () {
        console.log('Express server listening on port ' + app.get('port'));
      })
}

startup();

// start twitch bot
async function startup(){
  // Create a client with our options
  client = new tmi.client(opts);
    
  // Register our event handlers (defined below)
  client.on('message', onMessageHandler);
  client.on('connected', onConnectedHandler);
  client.on('disconnected', onDisconnectedHandler);
  
  // Connect to Twitch:
  await client.connect();

  // Channel init
  await channel.initialize(client);

  // Channels build
  await channel.buildChannels(await channel.getChannels(), client);
}

// Called every time a message comes in
async function onMessageHandler (target, context, message, self) {
  try{
    if (self) { return; } // Ignore messages from the bot
    if(!message.trim().toLowerCase().startsWith('!')) { return; } // Ignore normal chat messages
    
    var command = new Command(channel, target, context, message);
    var response = await command.execute();
    
    if(!response) {return;}

    var channelItem = channel.channels.find(x => x.name === target)
    
    if(channelItem){
      channelItem.puffer.addMessage(response);
    }
  } catch (ex){
    console.error(`ERR: on message handler`, ex);
  } 
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`INF: Connected to ${addr}:${port}`);
}

async function onDisconnectedHandler(){
  // Connect to Twitch:
  client.connect();
}