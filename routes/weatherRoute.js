const router = require("express").Router();
const { test, getWeather } = require("../controllers/weatherController");
const apicache = require("apicache");
const { rateLimitter } = require("../middlewares/rateLimitter");

//initialize the cache
let cache = apicache.middleware;

router.route("/test").get(test);
router
  .route("/get")
  .get(
    cache("2 minutes"),
    rateLimitter({ limit: 10, expiryTime: 60 }),
    getWeather
  );

module.exports = router;
