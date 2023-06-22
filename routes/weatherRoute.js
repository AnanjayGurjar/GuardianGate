const router = require("express").Router();
const { test, getWeather } = require("../controllers/weatherController");

router.route("/test").get(test);
router.route("/get").get(getWeather);

module.exports = router;
