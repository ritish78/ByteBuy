const express = require('express');
const dotenv = require('dotenv');
const { connectMongo } = require('./config/db');
const { resourceNotFound, errorHandler } = require('./middleware/errorMiddleware');

dotenv.config();
const app = express();

//Connecting to MongoDB
connectMongo();

app.use(express.json({ extended: false }));

const EXPRESS_SERVER_PORT = process.env.EXPRESS_SERVER_PORT;

app.get('/', (req, res) => {
    res.send({ message: 'API is working fine.' });
})

app.use('/api/products', require('./routes/api/products'));

app.use(resourceNotFound);
app.use(errorHandler);

app.listen(EXPRESS_SERVER_PORT, () => console.log('Server ready on port', EXPRESS_SERVER_PORT));