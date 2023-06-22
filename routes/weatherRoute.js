const router = require("express").Router();
const { test, getWeather } = require("../controllers/weatherController");
const apicache = require("apicache");

//initialize the cache
let cache = apicache.middleware;

router.route("/test").get(test);
router.route("/get").get(cache("2 minutes"), getWeather);

module.exports = router;
