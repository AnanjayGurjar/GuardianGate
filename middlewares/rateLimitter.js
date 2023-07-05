const ip = require("ip");
const Redis = require("ioredis");
const redis = new Redis();

exports.rateLimitter = ({ limit, expiryTime }) => {
  return async (req, res, next) => {
    const ipAddr = ip.address();

    const reqCount = await redis.incr(ipAddr);
    console.log(`No of requests made by ${ipAddr.slice(0, 6)} is ${reqCount}`);

    let ttl;
    if (reqCount == 1) {
      await redis.expire(ipAddr, expiryTime);
      ttl = expiryTime;
    } else {
      ttl = await redis.ttl(ipAddr);
    }

    if (reqCount > limit) {
      return res.status(503).json({
        error: "Rate Limit Exceeded",
        TimeToLive: ttl,
      });
    }

    next();
  };
};
