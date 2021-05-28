var express = require('express');
let Authorize = require('./twitch/authorize');

let endpoint = 'twitch';
let type = 'app';

const router = express.Router();

router.get('/' + endpoint, (req, res) => {
    if(req.query.state == req.session.state){
        Authorize.WebAuth(req, res, callback)
    } else {
        res.render('error', {
            title: 'Craffels Abenteuer'
        });
    }
});

function callback(req, res){
    res.render(endpoint, {
        title: 'Craffels Abenteuer'
    });
}

module.exports = router;