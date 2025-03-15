const redis = require('redis');
const client = redis.createClient();

const cacheMiddleware = (req, res, next) => {
    const key = req.originalUrl;

    client.get(key, (err, data) => {
        if (err) throw err;

        if (data) {
            // Return cached data
            res.json(JSON.parse(data));
        } else {
            // Proceed to the route handler
            next();
        }
    });
};

module.exports = cacheMiddleware;