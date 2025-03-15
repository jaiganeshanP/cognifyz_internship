const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const apiRoutes = require('./routes/api');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors()); // Enable CORS
app.use(helmet()); // Security headers
app.use(bodyParser.json()); // Parse JSON bodies
app.use(morgan('combined')); // Log HTTP requests

// Serve static files (e.g., logo, CSS)
app.use(express.static(path.join(__dirname, 'public')));

// Root route with HTML response
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Conifyz Tech</title>
            <link rel="icon" type="image/png" href="/logo.png">
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f9;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    margin: 0;
                }
                .container {
                    text-align: center;
                    background: white;
                    padding: 2rem;
                    border-radius: 10px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                }
                .logo {
                    width: 150px;
                    margin-bottom: 1rem;
                }
                h1 {
                    color: #333;
                    margin-bottom: 0.5rem;
                }
                p {
                    color: #666;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <img src="/logo.png" alt="Conifyz Tech Logo" class="logo">
                <h1>Welcome to Conifyz Tech</h1>
                <p>Advanced Server-Side Application</p>
            </div>
        </body>
        </html>
    `);
});

// API routes
app.use('/api', apiRoutes);

// 404 Handler for undefined routes
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});