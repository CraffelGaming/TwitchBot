var express = require('express');

let Authorize = require('../twitch/authorize');
let router = express.Router();
let endpoint = 'twitch';

module.exports = router;

router.get('/' + endpoint + '/url', async function (req, res) {
    res.status(200).json(Authorize.GetUrl(req,res));
});

module.exports = router;