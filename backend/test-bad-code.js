const express = require('express');
const router = express.Router();

// INTENTIONAL VULNERABILITY 1: Hardcoded Secret
const DB_PASSWORD = "Awanish_123_db_sql";

// INTENTIONAL VULNERABILITY 2: SQL Injection Risk
router.get('/user', (req, res) => {
    const userId = req.query.id;
    // Bad practice: directly concatenating raw user input into a query string
    const query = "SELECT * FROM users WHERE id = " + userId;
    
    res.send("Executing query: " + query);
});

module.exports = router;
