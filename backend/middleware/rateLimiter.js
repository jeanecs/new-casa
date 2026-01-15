const rateLimit = require('express-rate-limit');
const RedisStore = require('rate-limit-redis').default;
const redisClient = require('../config/upstash'); // Import your new config file

const bookingLimiter = rateLimit({
  store: new RedisStore({
    sendCommand: (...args) => redisClient.sendCommand(args),
  }),
  windowMs: 10 * 1000, 
  max: 5, 
  message: { message: "Too many booking attempts. Please try again in 10 seconds." }
});

const generalLimiter = rateLimit({
  store: new RedisStore({
    sendCommand: (...args) => redisClient.sendCommand(args),
  }),
  windowMs: 1 * 60 * 1000,
  max: 100
});

module.exports = { bookingLimiter, generalLimiter };