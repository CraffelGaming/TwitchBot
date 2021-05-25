var express = require('express');

let router = express.Router();
let endpoint = 'channel';

module.exports = router;

router.get('/' + endpoint + '/', async function (req, res) {
	res.status(200).json(await req.app.get('channel').globalDatabase.sequelize.models.channel.findAll());
});

router.put('/' + endpoint + '/', async function (req, res) {
	res.status(200).json(await req.app.get('channel').globalDatabase.sequelize.models.channel.findAll());
});

router.get('/' + endpoint + '/select/', async function (req, res) {	
	if(!req.session.channel)
		req.session.channel = '#craffel';
	res.status(200).json(req.session.channel.toString('base64'));
});

router.post('/' + endpoint + '/select/', async function (req, res) {
	req.session.channel = Buffer.from(req.query.channel, 'base64').toString('ascii');
	res.status(200).json(req.session.channel);
});

module.exports = router;