const fs = require('fs');
const path = require('path');

const logStream = fs.createWriteStream(path.join(__dirname, 'app.log'), { flags: 'a' });

const logger = {
    log: (message) => {
        const timestamp = new Date().toISOString();
        logStream.write(`[${timestamp}] ${message}\n`);
    },
};

module.exports = logger;