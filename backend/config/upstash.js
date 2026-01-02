const { createClient } = require('redis');

const redisClient = createClient({
	url: process.env.REDIS_URL, // Upstash Redis URL from .env
});

redisClient.connect().catch(console.error);

module.exports = redisClient;