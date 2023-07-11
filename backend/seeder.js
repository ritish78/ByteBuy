const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const colors = require('colors');
const users = require('./db/users');
const products = require('./db/products');
const User = require('./models/User');
const Product = require('./models/Products');
const Order = require('./models/Order');
const { connectMongo } = require('./config/db');

//Connect to MongoDB
connectMongo();

const importData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        const createdUsers = await User.insertMany(users);
        const adminUser = createdUsers[0]._id;

        const sampleProducts = products.map((product) => {
            return { ...product, user: adminUser }
        });

        await Product.insertMany(sampleProducts);

        console.log('Data imported'.green.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
}

const destroyData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        console.log('Data destroyed'.bgRed.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
}

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}