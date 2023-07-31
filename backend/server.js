const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cookieParser = require('cookie-parser');
const { connectMongo } = require('./config/db');
const { resourceNotFound, errorHandler } = require('./middleware/errorMiddleware');
const rateLimiter = require('./middleware/rateLimiter');

dotenv.config();
const app = express();

//Connecting to MongoDB
connectMongo();

app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(rateLimiter);

if (process.env.NODE_ENV === 'production') {
    const __dirname = path.resolve();
    app.use('/uploads', express.static('/var/data/uploads'));
    app.use(express.static(path.join(__dirname, '/frontend/build')));
  
    app.get('*', (req, res) =>
      res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    );
} else {
    app.get('/', (req, res) => {
        res.send({ message: 'API is working fine.' });
    })
}

const EXPRESS_SERVER_PORT = process.env.EXPRESS_SERVER_PORT;


app.use('/api/products', require('./routes/api/products'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/orders', require('./routes/api/orders'));
app.use('/api/address', require('./routes/api/address'));
app.use('/api/reviews', require('./routes/api/review'));
app.use('/api/images', require('./routes/api/imageUpload'));

app.get('/api/config/paypal', (req, res) => {
    res.json({ clientId: process.env.PAYPAL_CLIENT_ID });
})

app.use(resourceNotFound);
app.use(errorHandler);

app.listen(EXPRESS_SERVER_PORT, () => console.log('Server ready on port', EXPRESS_SERVER_PORT));