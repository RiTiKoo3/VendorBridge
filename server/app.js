require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./src/config/db')


// Connect to MongoDB
connectDB()

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});