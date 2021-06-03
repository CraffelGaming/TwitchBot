var express = require('express');

let channels = require("./api/api.channel");
let objects = require("./api/api.object");
let modules = require("./api/api.module");
let statistic = require("./api/api.statistic");
let level = require("./api/api.level");
let hero = require("./api/api.hero");
let twitch = require("./api/api.twitch");

let router = express.Router();

router.get("/channel", channels);
router.put("/channel", channels);

router.get("/channel/select", channels);
router.post("/channel/select", channels);

router.get("/object", objects);

router.get("/module", modules);

router.get("/statistic/gold", statistic);
router.get("/statistic/experience", statistic);

router.get("/level", level);
router.get("/level/:experience", level);

router.get("/hero", hero);
router.get("/hero/:handle", hero);

router.get("/twitch/url", twitch);

module.exports = router;