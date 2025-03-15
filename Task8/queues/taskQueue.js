const Queue = require('bull');
const redisConfig = { host: 'localhost', port: 6379 };

// Create a queue
const taskQueue = new Queue('taskQueue', { redis: redisConfig });

// Process jobs
taskQueue.process(async (job) => {
    console.log('Processing job:', job.data);

    // Simulate a time-consuming task (e.g., sending an email)
    await new Promise((resolve) => setTimeout(resolve, 5000));

    console.log('Job completed:', job.data);
    return { result: 'Success' };
});

module.exports = { taskQueue };