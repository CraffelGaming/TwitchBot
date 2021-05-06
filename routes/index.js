var express = require('express');
let object = require('./object');

let endpoint = 'index';
let type = 'app';

const router = express.Router();

router.get('/object', object);

//index
router.get('/', (req, res) => {
    res.render(endpoint, {
        title: 'Craffels Abenteuer'
    });
});

module.exports = router;