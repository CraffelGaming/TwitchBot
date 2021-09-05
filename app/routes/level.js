var express = require('express');

let endpoint = 'level';
let type = 'app';

const router = express.Router();

router.get('/' + endpoint, (req, res) => {
    res.render(endpoint, {
        title: 'Craffels Abenteuer'
    });
});

module.exports = router;