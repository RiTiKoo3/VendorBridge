require('dotenv').config();
const express = require('express');
const app = express();

const vendorRoutes = require('./routes/vendorRoutes');
const rfqRoutes = require('./routes/rfqRoutes');

app.use(express.json())

app.use('/api/vendors', vendorRoutes)
app.use('/api/rfqs', rfqRoutes)

module.exports = app;
