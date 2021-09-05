var express = require('express');

let router = express.Router();
let endpoint = 'object';

module.exports = router;

router.get('/' + endpoint + '/', async function (req, res) {
    var channel = req.app.get('channel').channels.find(x => x.name == req.session.channel)
	if(channel != null)
        res.status(200).json(await channel.database.sequelize.models.loot_object.findAll());
    else res.status(404);
});

module.exports = router;