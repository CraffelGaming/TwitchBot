var express = require('express');
let object = require('./object');
let statistic = require('./statistic');
let level = require('./level');
let hero = require('./hero');
let twitch = require('./twitch');
let error = require('./error');
let impressum = require('./impressum');
let command = require('./command');

let Authorize = require('./twitch/authorize');

let endpoint = 'index';
let type = 'app';

const router = express.Router();

router.get('/object', object);
router.get('/statistic', statistic);
router.get('/level', level);
router.get('/hero', hero);
router.get('/twitch', twitch);
router.get('/error', error);
router.get('/impressum', impressum);
router.get('/command', command);

//index
router.get('/', (req, res) => {
    res.render(endpoint, {
        title: 'Craffels Abenteuer'
    });
});
module.exports = router;