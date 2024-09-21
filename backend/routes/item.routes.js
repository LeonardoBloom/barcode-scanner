const express = require('express');
const db = require('../db');
const router = express.Router();

// get ALL items
router.get('/', (req, res) => {
    const sql = 'SELECT * from item';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching items:', err.message); // Log the actual error
            return res.status(500).json({ error: 'Failed to fetch items' }); // Return a 500 response with an error message
        }
        res.json(results);
    });
    console.log("GET all items request");
})

router.get('/:item_id', (req, res) => {
    const { item_id } = req.params;
    console.log(item_id);

    const sql = 'select * from item where item_id = ?';
    db.query(sql, [item_id], (err, results) => {
        if (err) {
            console.error('Error fetching items:', err.message); // Log the actual error
            return res.status(500).json({ error: 'Failed to fetch item' }); // Return a 500 response with an error message
        }
        res.json(results);
        console.log(`recovered item with id ${results[0] ? results[0].item_id : null}`);
    });
    console.log("GET an item request");
})



router.post('/new', (req, res) => {
    const { item_id, item_name, item_quantity, current_stock, item_price, item_image } = req.body;

    const sql = 'INSERT INTO item (item_id, item_name, item_quantity, current_stock, item_price, item_image) VALUES (?, ?, ?, ?, ?, ?)';

    db.query(sql, [item_id, item_name, item_quantity, current_stock, item_price, item_image], (err, result) => {
        if (err) {
            return res.status(500).json({error: err.message});
        }
        res.status(201).json({message: `Item: #${item_id} (${item_name}) added successfully`});
    });
});

module.exports = router; 