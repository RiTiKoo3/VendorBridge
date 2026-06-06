require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

const vendorRoutes = require('./routes/vendorRoutes');
const rfqRoutes = require('./routes/rfqRoutes');
const authRoutes = require('./routes/authRoutes');

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.use('/api/auth', authRoutes)
app.use('/api/vendors', vendorRoutes)
app.use('/api/rfqs', rfqRoutes)

module.exports = app;
