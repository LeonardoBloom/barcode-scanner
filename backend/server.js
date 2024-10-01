const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

// ROUTE COLLECTIONS
const itemRoutes = require('./routes/item.routes');
const palletRoutes = require('./routes/pallet.routes');
const documentRoutes = require('./routes/document.routes');

const app = express();
app.use(express.json());
// Apply middleware configuration **before** defining the routes
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded bodies (form data)

app.use('/api/items', itemRoutes);
app.use('/api/pallets', palletRoutes);
app.use('/api/document', documentRoutes);

app.get('/', (req, res) => {
    res.send('Merchandise System');
})

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
    console.log(`Merch Server running on port ${PORT}`);
})