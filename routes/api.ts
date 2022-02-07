var express = require('express');

const swaggerUi = require('swagger-ui-express');
import * as specs from '../swagger';

let channels = require("./api/api.channel");
let objects = require("./api/api.object");
let modules = require("./api/api.module");
let statistic = require("./api/api.statistic");
let level = require("./api/api.level");
let hero = require("./api/api.hero");
let twitch = require("./api/api.twitch");
let shop = require("./api/api.shop");
let command = require("./api/api.command");

let router = express.Router();

/**
 * @swagger
 * /channel:
 *   get:
 *     tags:
 *     - channel
 *     summary: Kanäle
 *     description: Liste aller registrierten Kanäle
 *     consumes:
 *     - application/json
 *     responses:
 *       200:
 *         description: successful operation
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "#craffelmat"
 *               displayName:
 *                 type: string
 *                 example: "Craffelmat"
 *               language:
 *                 type: string
 *                 example: "de-DE"
 *               isActive:
 *                 type: boolean
 *                 example: true
 *               createdAt:
 *                 type: string
 *                 example: "2022-02-04T11:55:03.039Z"
 *               updatedAt:
 *                 type: string
 *                 example: "2022-02-04T11:55:03.039Z"
 *       404:
 *         description: not found   
 */
router.get("/channel", channels);

/**
 * @swagger
 * /channel:
 *   put:
 *     tags:
 *     - channel
 *     summary: Kanäle
 *     description: Registriert den angemeldeten Channel
 *     consumes:
 *     - application/json
 *     responses:
 *       201:
 *         description: successful operation
 *       403:
 *         description: missing twitch login
 *       404:
 *         description: not found   
 */
router.put("/channel", channels);

router.post("/shop/sell", shop);

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

router.get("/command", command);
router.get("/command/dynamic/say", command);
router.get("/command/:name", command);

router.get("/twitch", twitch);

//documentation endpoint for Swagger
router.use('/', swaggerUi.serve, swaggerUi.setup(specs.default));

module.exports = router;