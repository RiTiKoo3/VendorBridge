require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

const vendorRoutes = require('./routes/vendorRoutes');
const rfqRoutes = require('./routes/rfqRoutes');
const authRoutes = require('./routes/authRoutes');
const quotationRoutes = require("./routes/quotationRoutes");
const approvalRoutes = require("./routes/approvalRoutes");
const purchaseOrderRoutes = require("./routes/purchaseOrderRoutes");
const invoiceRoutes = require("./routes/invoiceRoutes");

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.use('/api/auth', authRoutes)
app.use('/api/vendors', vendorRoutes)
app.use('/api/rfqs', rfqRoutes)
app.use('/api/quotations', quotationRoutes)
app.use('/api/approvals', approvalRoutes)
app.use('/api/purchase-orders', purchaseOrderRoutes)
app.use('/api/invoices', invoiceRoutes)

module.exports = app;
