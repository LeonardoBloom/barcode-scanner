const express = require('express');
const db_promise = require('../dbAsync');
const db = require('../db');
const router = express.Router();


// Get ALL Pallets
router.get('/get', async (req, res) => {
    const sql = 'SELECT * from pallet';

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching Pallets', err.message);
            return res.status(500).json({error: 'failed to fetch Pallets'});
        }
        res.json(results);
    });
    console.log("GET all PALLETS request")
})


// Save a new pallet
router.post('/save', async (req, res) => {
    const {supplier, items} = req.body;
    const dateCreated = new Date();

    console.log("Started saving pallet...")
    try {

        const connection = await db_promise.getConnection()

        // Insert the new Pallet
        const [palletResult] = await connection.query('INSERT INTO pallet (date_created, supplier_name) VALUES (?, ?)', [dateCreated, supplier])
        const palletId = palletResult.insertId;

        // insert items attached to the pallet
        for (const item of items) {
            const [itemResult] = await connection.query('SELECT item_id FROM item WHERE item_name = ?', [item.name]);
            let itemId;

            if (itemResult.length > 0) {
                // Item exists, get its ID
                itemId = itemResult[0].id;
            } else {
                // Item does not exist, insert it
                console.log("Item does not exist in database, please contact the Admin")
            }

            await connection.query('INSERT INTO pallet_items (pallet_id, item_id, item_quantity, item_count, item_name) VALUES (?, ?, ?, ?, ?)', [palletId, item.id, item.litres, item.item_count, item.name]);
        }

        res.status(201).json({message: `Pallet ${palletId} and items saved successfully`})

    } catch (error) {
        res.status(500).json({error: `error in pallet.routes.js: ${error.message}`});
    }
});

module.exports = router;