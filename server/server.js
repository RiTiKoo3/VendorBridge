const app = require('./src/app');
const connectDB = require('./src/config/db')


// Connect to MongoDB
connectDB()


app.listen(5000, () => {
  console.log('Example app listening on port 5000!');
});