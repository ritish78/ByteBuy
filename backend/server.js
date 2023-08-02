const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cookieParser = require('cookie-parser');
const { connectMongo } = require('./config/db');
const { resourceNotFound, errorHandler } = require('./middleware/errorMiddleware');
const rateLimiter = require('./middleware/rateLimiter');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const fs = require('fs');

dotenv.config();
const app = express();

//Connecting to MongoDB
connectMongo();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(rateLimiter);
app.use(cors(corsOptions));


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

if (!fs.existsSync("/uploads")) {
    fs.mkdirSync("/uploads");
    console.log('Created uploads folder.')
} else {
    console.log('Uploads folder already exists!');
}

if (process.env.NODE_ENV === 'production') {
    const __dirname = path.resolve();
    console.log(__dirname);
    
    app.use('/uploads', express.static('uploads'));
    
    // Update the path to reach the 'build' folder inside 'frontend'
    app.use(express.static(path.join(__dirname, '..', 'frontend/build')));
    
    const root = path.join(__dirname, '..', 'frontend', 'build', 'index.html')
    
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(root) , 'index.html')
    });
} else {
    app.get('/', (req, res) => {
        res.send({ message: 'API is working fine.' });
    })
}

console.log(path.join(__dirname, '..', 'frontend', 'build', 'index.html'));
console.log(path.resolve(path.join(__dirname, '..', '/frontend/build')) === path.join(__dirname, '..', '/frontend/build'));

app.use(resourceNotFound);
app.use(errorHandler);

app.listen(EXPRESS_SERVER_PORT, () => console.log('Server ready on port', EXPRESS_SERVER_PORT));