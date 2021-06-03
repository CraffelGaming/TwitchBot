var express = require('express');

let router = express.Router();
let endpoint = 'hero';

module.exports = router;

router.get('/' + endpoint + '/', async function (req, res) {
    var channel = req.app.get('channel').channels.find(x => x.name == req.session.channel)
	if(channel != null) 
        res.status(200).json(
            await channel.database.sequelize.models.loot_hero.findAll({ order: [['name', 'ASC']], offset: 0, limit: 1000 }) 
        );
    else res.status(404);
});

router.get('/' + endpoint + '/:handle', async function (req, res) {
    console.log(req.params.handle);
    var channel = req.app.get('channel').channels.find(x => x.name == req.session.channel)
	if(channel != null) 
        res.status(200).json(await channel.database.sequelize.models.loot_hero.findOne({
            where: { handle : req.params.handle},
            include: [{
                model: channel.database.sequelize.models.loot_inventory,
                include: [
                    {
                        model: channel.database.sequelize.models.loot_object,
                    }
                ]
            }],
            order: [['name', 'ASC']], offset: 0, limit: 1000 }));
    else res.status(404);
});

module.exports = router;