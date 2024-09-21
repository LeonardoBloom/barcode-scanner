const express = require('express');
const mysql = require('mysql2');

// ROUTE COLLECTIONS
const itemRoutes = require('./routes/item.routes');

const app = express();
app.use(express.json());

app.use('/api/items', itemRoutes);

app.get('/', (req, res) => {
    res.send('Merchandise System');
})

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
    console.log(`Merch Server running on port ${PORT}`);
})