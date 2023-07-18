const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const { connectMongo } = require('./config/db');
const { resourceNotFound, errorHandler } = require('./middleware/errorMiddleware');

dotenv.config();
const app = express();

//Connecting to MongoDB
connectMongo();

app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const EXPRESS_SERVER_PORT = process.env.EXPRESS_SERVER_PORT;

app.get('/', (req, res) => {
    res.send({ message: 'API is working fine.' });
})

app.use('/api/products', require('./routes/api/products'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/orders', require('./routes/api/orders'));
app.use('/api/address', require('./routes/api/address'));

app.use(resourceNotFound);
app.use(errorHandler);

app.listen(EXPRESS_SERVER_PORT, () => console.log('Server ready on port', EXPRESS_SERVER_PORT));