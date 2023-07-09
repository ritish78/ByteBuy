const express = require('express');
const products = require('./db/products');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.use(express.json({ extended: false }));

const EXPRESS_SERVER_PORT = process.env.EXPRESS_SERVER_PORT;

app.get('/', (req, res) => {
    res.send({ message: 'API is working fine.' });
})

app.get('/api/product/:id', (req, res) => {
    const product = products.find((product) => product._id === req.params.id);
    if (product) {
        return res.status(200).json(product);
    } else {
        return res.status(404).json({ message: 'Product does not exists!' });
    }
})

app.listen(EXPRESS_SERVER_PORT, () => console.log('Server ready on port', EXPRESS_SERVER_PORT));