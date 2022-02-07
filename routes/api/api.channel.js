var express = require('express');

let router = express.Router();
let endpoint = 'channel';

module.exports = router;

router.get('/' + endpoint + '/', async function (req, res) {
	res.status(200).json(await req.app.get('channel').globalDatabase.sequelize.models.channel.findAll());
});

router.put('/' + endpoint + '/', async function (req, res) {
	if(req.session.state){
		var twitchItem = await req.app.get('channel').globalDatabase.sequelize.models.twitch.findOne({ where: { state: req.session.state } });
		if(twitchItem){
			req.app.get('channel').addChannel(twitchItem.channelName, req.app.get('client'));
			res.status(201);
		} else res.status(401);	
	} else res.status(401);
});

router.get('/' + endpoint + '/select/', async function (req, res) {	
	if(!req.session.channel)
		req.session.channel = '#craffel';
	res.status(200).json(req.session.channel);
});

router.post('/' + endpoint + '/select/', async function (req, res) {
	req.session.channel = Buffer.from(req.query.channel, 'base64').toString('ascii');
	res.status(200).json(req.session.channel);
});

module.exports = router;