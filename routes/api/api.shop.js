var express = require('express');

let router = express.Router();
let endpoint = 'shop';

module.exports = router;

router.post('/' + endpoint + '/sell', async function (req, res) {  
    var channel = req.app.get('channel').channels.find(x => x.name == req.session.channel)
	if(channel != null) {
        var twitchItem = await req.app.get('channel').globalDatabase.sequelize.models.twitch.findOne({ where: { channelName: req.query.hero } });
        if(twitchItem && twitchItem.state == req.session.state){
            var hero = await channel.database.sequelize.models.loot_hero.findOne({
                where: { name : twitchItem.channelName},
                include: [{ model: channel.database.sequelize.models.loot_inventory,
                    include: [{ model: channel.database.sequelize.models.loot_object,
                    }]
                }],
                order: [['name', 'ASC']], offset: 0, limit: 1000 })

            for (var sell of Object.values(req.body)) {
                var object = hero.loot_inventories.find(x => x.objectHandle == sell.objectHandle);

                if((object.isReload && object.quantity - 1 >= sell.quantity) || (!object.isReload && object.quantity >= sell.quantity)){
                    hero.gold += (object.loot_object.gold * parseInt(sell.quantity));
                    object.quantity -= parseInt(sell.quantity);
                    if(object.quantity > 0) 
                        await object.save();
                    else await object.destroy();
                }
                await hero.save();
                res.status(200).json(req.body);
            }
        } else res.status(401);
    }
    else res.status(404);
});

module.exports = router;