var express = require('express');

let router = express.Router();
let endpoint = 'object';

module.exports = router;

router.get('/' + endpoint + '/', async function (req, res) {
    console.log("CHANNEL: " + req.query.channel);
    var channel = req.app.get('channel').channels.find(x => x.name === '#' + req.query.channel)
	res.status(200).json(await channel.database.sequelize.models.loot_object.findAll());
});

module.exports = router;