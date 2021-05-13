var express = require('express');

let channels = require("./api/api.channel");
let objects = require("./api/api.object");
let modules = require("./api/api.module");

let router = express.Router();

router.get("/channel", channels);
router.put("/channel", channels);

router.get("/object", objects);

router.get("/module", modules);

module.exports = router;