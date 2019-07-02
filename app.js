const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

require('dotenv').config()

mongoose.connect(`mongodb+srv://root:${process.env.MONGO_ATLAS_PW}@cluster0-3s0ia.mongodb.net/shop?retryWrites=true&w=majority`, {
    useNewUrlParser: true
})

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authentication');
//     if (req.method === 'OPTIONS') {
//         res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE');
//         return res.status(200).json({});
//     }
// });

// Routes which should handle requests
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message
        }
    });
});

app.use((req, res, next) => {
    res.status(200).json({
        message: 'It worksssdd'
    });
});

module.exports = app;