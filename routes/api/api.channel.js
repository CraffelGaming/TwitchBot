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

module.exports = router;