var express = require('express');
let object = require('./object');
let statistic = require('./statistic');
let level = require('./level');
let hero = require('./hero');

let endpoint = 'index';
let type = 'app';

const router = express.Router();

router.get('/object', object);
router.get('/statistic', statistic);
router.get('/level', level);
router.get('/hero', hero);

//index
router.get('/', (req, res) => {
    res.render(endpoint, {
        title: 'Craffels Abenteuer'
    });
});

module.exports = router;