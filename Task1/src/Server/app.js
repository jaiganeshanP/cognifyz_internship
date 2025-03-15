const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000; // You can change this to any port you prefer

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Serve your index.html file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Handle form submission
app.post('/submit-form', (req, res) => {
    const { name, email } = req.body;
    console.log(`Testing................`);
    console.log(`${name}, ${email}`);
    res.render('submission', { name }); // Render the 'submission' view with the 'name' variable
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});