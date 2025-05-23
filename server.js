const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'your_username',
    password: 'your_password',
    database: 'wedding_planner'
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to database.');
});

// Contact form submission endpoint
app.post('/submit-form', (req, res) => {
    const { name, email, message } = req.body;
    
    const query = 'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)';
    db.query(query, [name, email, message], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to submit form' });
        }
        res.json({ message: 'Form submitted successfully!' });
    });
});

// Get testimonials
app.get('/testimonials', (req, res) => {
    const query = 'SELECT * FROM testimonials';
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to fetch testimonials' });
        }
        res.json(results);
    });
});

// Get gallery images
app.get('/gallery', (req, res) => {
    const query = 'SELECT * FROM gallery';
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to fetch gallery' });
        }
        res.json(results);
    });
});

// Get services
app.get('/services', (req, res) => {
    const query = 'SELECT * FROM services';
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to fetch services' });
        }
        res.json(results);
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});