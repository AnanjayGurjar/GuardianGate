const needle = require("needle");
const url = require("url");

const API_BASE_URL = process.env.BASE_URL;
const API_KEY_NAME = process.env.API_KEY_NAME;
const API_KEY_VALUE = process.env.API_KEY_VALUE;

exports.test = (req, res) => {
  res.status(200).json({
    success: true,
    greeting: "hello from test route",
  });
};

exports.getWeather = async (req, res) => {
  try {
    const params = new URLSearchParams({
      [API_KEY_NAME]: API_KEY_VALUE,
      ...url.parse(req.url, true).query,
    });

    const apiResponse = await needle("get", `${API_BASE_URL}?${params}`);

    // console.log(`${API_BASE_URL}?${params}`);
    res.status(200).json({
      data: apiResponse.body,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      error: error,
    });
  }
};
