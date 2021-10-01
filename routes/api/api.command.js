var express = require('express');

let router = express.Router();
let endpoint = 'command';

module.exports = router;

router.get('/' + endpoint + '/', async function (req, res) {
    var channel = req.app.get('channel').channels.find(x => x.name == req.session.channel)
	if(channel != null) {
        var twitchItem = await req.app.get('channel').globalDatabase.sequelize.models.twitch.findOne({ where: { channelName: req.session.channel.replace("#","")} });
        if(twitchItem && twitchItem.state == req.session.state)
            res.status(200).json(await channel.database.sequelize.models.command.findAll());
        else res.status(200).json(await channel.database.sequelize.models.command.findAll({ where:{ isAdmin: false}}));
    }
    else res.status(404);
});

router.get('/' + endpoint + '/:name', async function (req, res) {
    var channel = req.app.get('channel').channels.find(x => x.name == req.session.channel)
	if(channel != null) {
        var twitchItem = await req.app.get('channel').globalDatabase.sequelize.models.twitch.findOne({ where: { channelName: req.session.channel.replace("#","")} });
        if(twitchItem && twitchItem.state == req.session.state)
            res.status(200).json(await channel.database.sequelize.models.command.findAll({ where:{ name : req.params.name}}));
        else res.status(200).json(await channel.database.sequelize.models.command.findAll({ where:{ name : req.params.name, isAdmin: false}}));
    }
        
    else res.status(404);
});

router.get('/' + endpoint + '/dynamic/say', async function (req, res) {
    var channel = req.app.get('channel').channels.find(x => x.name == req.session.channel)
	if(channel != null)
        res.status(200).json(await channel.database.sequelize.models.module_say.findAll());
    else res.status(404);
});

module.exports = router;