var express = require('express');

let router = express.Router();
let endpoint = 'module';

module.exports = router;

router.get('/' + endpoint + '/', async function (req, res) {
    res.status(200).json(await req.app.get('channel').globalDatabase.sequelize.models.module.findAll());
});

module.exports = router;