var express = require('express');

let router = express.Router();
let endpoint = 'module';

module.exports = router;

router.get('/' + endpoint + '/', function (req, res) {
    var channel = req.app.get('channel').channels.find(x => x.name === Buffer.from(req.query.channel, 'base64').toString('ascii'))
    console.log(channel.modules);
	res.status(200).json(channel.modules);
});
module.exports = router;