"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
const swaggerUi = require('swagger-ui-express');
const specs = require("../swagger");
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
 *     - Channel
 *     summary: Liste aller registrierten Kanäle
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
 *     - Channel
 *     summary: Registriert den angemeldeten Channel
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
/**
 * @swagger
 * /channel/select:
 *   get:
 *     tags:
 *     - Channel
 *     summary: Zeigt den aktuell azsgewählten Kanal an.
 *     description: Zeigt den aktuell azsgewählten Kanal an.
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
router.get("/channel/select", channels);
/**
 * @swagger
 * /channel/select:
 *   post:
 *     tags:
 *     - Channel
 *     summary: Wählt den übergebenen Kanal aus.
 *     description: Wählt den übergebenen Kanal aus.
 *     consumes:
 *     - application/json
 *     parameters:
 *     - name: "channel"
 *       in: "query"
 *       description: "Twitch Kanal"
 *       required: true
 *       type: "string"
 *       default: "#craffelmat"
 *     responses:
 *       201:
 *         description: successful operation
 *       403:
 *         description: missing twitch login
 *       404:
 *         description: not found
 */
router.post("/channel/select", channels);
/**
 * @swagger
 * /object:
 *   get:
 *     tags:
 *     - Object
 *     summary: Listet alle Gegenstände im Abenteuer auf.
 *     description: Listet alle Gegenstände im Abenteuer auf.
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
router.get("/object", objects);
/**
 * @swagger
 * /module:
 *   get:
 *     tags:
 *     - Module
 *     summary: Listet alle Module auf.
 *     description: Listet alle Module auf.
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
router.get("/module", modules);
/**
 * @swagger
 * /statistic/gold:
 *   get:
 *     tags:
 *     - Statistic
 *     summary: Top 10 Abenteurer nach Gold
 *     description: Top 10 Abenteurer nach Gold
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
router.get("/statistic/gold", statistic);
/**
 * @swagger
 * /statistic/experience:
 *   get:
 *     tags:
 *     - Statistic
 *     summary: Top 10 Abenteurer nach Erfahrung
 *     description: Top 10 Abenteurer nach Erfahrung
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
router.get("/statistic/experience", statistic);
/**
 * @swagger
 * /level:
 *   get:
 *     tags:
 *     - Level
 *     summary: Listet alle möglichen Level der Abenteurer auf.
 *     description: Listet alle möglichen Level der Abenteurer auf.
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
router.get("/level", level);
/**
 * @swagger
 * /level/{experience}:
 *   get:
 *     tags:
 *     - Level
 *     summary: Liefert das Level anhand der Erfahrungspunkte.
 *     description: Liefert das Level anhand der Erfahrungspunkte.
 *     consumes:
 *     - application/json
 *     parameters:
 *     - name: "experience"
 *       in: "path"
 *       description: "Erfahrungspunkte"
 *       required: true
 *       type: "string"
 *       default: 5000
 *     responses:
 *       201:
 *         description: successful operation
 *       403:
 *         description: missing twitch login
 *       404:
 *         description: not found
 */
router.get("/level/:experience", level);
/**
 * @swagger
 * /hero:
 *   get:
 *     tags:
 *     - Hero
 *     summary: Listet alle Abenteurer auf.
 *     description: Listet alle Abenteurer auf.
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
router.get("/hero", hero);
/**
 * @swagger
 * /hero/{handle}:
 *   get:
 *     tags:
 *     - Hero
 *     summary: Gibt einen Abenteurer anhand der eindeutigen ID zürück.
 *     description: Gibt einen Abenteurer anhand der eindeutigen ID zürück.
 *     consumes:
 *     - application/json
 *     parameters:
 *     - name: "handle"
 *       in: "path"
 *       description: "ID des Helden"
 *       required: true
 *       type: "string"
 *       default: "1"
 *     responses:
 *       201:
 *         description: successful operation
 *       403:
 *         description: missing twitch login
 *       404:
 *         description: not found
 */
router.get("/hero/:handle", hero);
/**
 * @swagger
 * /command:
 *   get:
 *     tags:
 *     - Command
 *     summary: Listet alle Belfehle auf.
 *     description: Listet alle Belfehle auf.
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
router.get("/command", command);
/**
 * @swagger
 * /command/dynamic/say:
 *   get:
 *     tags:
 *     - Command
 *     summary: Listet alle dynamischen Belfehle auf.
 *     description: Listet alle dynamischen Belfehle auf.
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
router.get("/command/dynamic/say", command);
/**
 * @swagger
 * /command/{name}:
 *   get:
 *     tags:
 *     - Command
 *     summary: Gibt einen Befehl anhand des eindeutigen Namens zurück.
 *     description: Gibt einen Befehl anhand des eindeutigen Namens zurück.
 *     consumes:
 *     - application/json
 *     parameters:
 *     - name: "name"
 *       in: "path"
 *       description: "Name des Befehls"
 *       required: true
 *       type: "string"
 *       default: "loot"
 *     responses:
 *       201:
 *         description: successful operation
 *       403:
 *         description: missing twitch login
 *       404:
 *         description: not found
 */
router.get("/command/:name", command);
/**
 * @swagger
 * /shop/sell:
 *   post:
 *     tags:
 *     - Shop
 *     summary: Verkauft den übergebenen Gegenstand des Abenteurers.
 *     description: Verkauft den übergebenen Gegenstand des Abenteurers.
 *     consumes:
 *     - application/json
  *     parameters:
 *     - name: "hero"
 *       in: "query"
 *       description: "Name des Abenteurers"
 *       required: true
 *       type: "string"
 *       default: "craffelmat"
 *     responses:
 *       201:
 *         description: successful operation
 *       403:
 *         description: missing twitch login
 *       404:
 *         description: not found
 */
router.post("/shop/sell", shop);
/**
 * @swagger
 * /twitch:
 *   get:
 *     tags:
 *     - Twitch
 *     summary: Anzeige der aktuellen Twitch-Anmeldung.
 *     description: Anzeige der aktuellen Twitch-Anmeldung.
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
router.get("/twitch", twitch);
//documentation endpoint for Swagger
router.use('/', swaggerUi.serve, swaggerUi.setup(specs.default));
module.exports = router;
//# sourceMappingURL=api.js.map