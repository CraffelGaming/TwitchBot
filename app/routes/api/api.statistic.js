const { Op } = require("sequelize");

var express = require('express');

let router = express.Router();
let endpoint = 'statistic';

module.exports = router;

router.get('/' + endpoint + '/gold/', async function (req, res) {
    var channel = req.app.get('channel').channels.find(x => x.name == req.session.channel)
	if(channel != null) 
        res.status(200).json(
            await channel.database.sequelize.models.loot_hero.findAll({ 
                where: { gold :{[Op.gt]: 0}
            }, order: [['gold', 'DESC']], offset: 0, limit: 10}) 
        );
    else res.status(404);
});

router.get('/' + endpoint + '/experience/', async function (req, res) {
    var channel = req.app.get('channel').channels.find(x => x.name == req.session.channel)
	if(channel != null) 
        res.status(200).json(
            await channel.database.sequelize.models.loot_hero.findAll({ 
                where: { experience :{[Op.gt]: 0}
            }, order: [['experience', 'DESC']], offset: 0, limit: 10}) 
        );
    else res.status(404);
});

module.exports = router;