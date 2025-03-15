const express = require('express');
const { taskQueue } = require('../queues/taskQueue');
const cacheMiddleware = require('../middleware/cacheMiddleware');
const redis = require('redis');
const client = redis.createClient();

const router = express.Router();

// Example route with caching
router.get('/data', cacheMiddleware, (req, res) => {
    const data = { message: 'This is fresh data' };

    // Cache the response for 10 minutes
    client.setex(req.originalUrl, 600, JSON.stringify(data));

    res.json(data);
});

// Route to add a background task
router.post('/task', async (req, res) => {
    const { taskData } = req.body;

    if (!taskData) {
        return res.status(400).json({ error: 'Task data is required' });
    }

    // Add a job to the queue
    const job = await taskQueue.add({ taskData });

    res.json({ message: 'Task added to queue', jobId: job.id });
});

module.exports = router;