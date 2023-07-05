const express = require("express");
const app = express();
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const PORT = process.env.PORT || 4000;

// const limiter = rateLimit({
//   windowMs: 5 * 60 * 1000, //5 requests allowed in 5 minitues
//   max: 5,
// });

// app.use(limiter);
app.set("trust proxy", 1);
//routes
const weatherRoute = require("./routes/weatherRoute");

app.use("/api", weatherRoute);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
