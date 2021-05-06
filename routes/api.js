var express = require('express');

let channel = require("./api/api.channel");
let object = require("./api/api.object");
let router = express.Router();

router.get("/channel", channel);
router.put("/channel", channel);

router.get("/object", object);

module.exports = router;