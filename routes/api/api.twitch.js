var express = require('express');

let Authorize = require('../twitch/authorize');
let router = express.Router();
let endpoint = 'twitch';

module.exports = router;

router.get('/' + endpoint, async function (req, res) {
    res.status(200).json(await Authorize.GetConnection(req, res));
});

module.exports = router;