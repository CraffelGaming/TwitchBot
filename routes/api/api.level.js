var express = require('express');
const { Op } = require("sequelize");

let router = express.Router();
let endpoint = 'level';

module.exports = router;

router.get('/' + endpoint + '/', async function (req, res) {
    var channel = req.app.get('channel').channels.find(x => x.name == req.session.channel)
	if(channel != null)
        res.status(200).json(await channel.database.sequelize.models.loot_level.findAll());
    else res.status(404);
});

router.get('/' + endpoint + '/:experience', async function (req, res) {
    var channel = req.app.get('channel').channels.find(x => x.name == req.session.channel)
	if(channel != null)
        res.status(200).json(await channel.database.sequelize.models.loot_level.findOne({ 
            where: { experienceMin :{[Op.lte]: req.params.experience }, 
            experienceMax :{[Op.gte]: req.params.experience }
        }}));
    else res.status(404);
});

module.exports = router;