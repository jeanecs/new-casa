const rateLimit = require('express-rate-limit');
const RedisStore = require('rate-limit-redis').default;
const redisClient = require('../config/upstash'); // Import your new config file

const bookingLimiter = rateLimit({
  store: new RedisStore({
    sendCommand: (...args) => redisClient.sendCommand(args),
  }),
  windowMs: 15 * 60 * 1000, 
  max: 5, 
  message: { message: "Too many booking attempts. Please try again in 15 minutes." }
});

const generalLimiter = rateLimit({
  store: new RedisStore({
    sendCommand: (...args) => redisClient.sendCommand(args),
  }),
  windowMs: 1 * 60 * 1000,
  max: 100
});

module.exports = { bookingLimiter, generalLimiter };