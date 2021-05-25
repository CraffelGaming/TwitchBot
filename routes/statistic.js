var express = require('express');

let endpoint = 'statistic';
let type = 'app';

const router = express.Router();

router.get('/' + endpoint, (req, res) => {
    res.render(endpoint, {
        title: 'Craffels Abenteuer'
    });
});

module.exports = router;