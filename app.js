const express = require('express');
const mongoose = require('mongoose');
const { swaggerUi, specs } = require('./swagger');
const app = express();
app.use(express.json());
const itemRoutes = require('./routes/itemRoutes');
const menuRoutes = require('./routes/menuRoutes');
const orderRoutes = require('./routes/orderRoutes');
const userRoutes = require('./routes/userRoutes');



mongoose.connect(process.env.MONGO_URI,
    { useNewUrlParser: true,
      useUnifiedTopology: true })
    .then(() => console.log('Connection to MongoDB successful!'))
    .catch((error) => console.log('Connection to MongoDB failed!', error ));


app.use((req, res, next) => { //solves the CORS issue as it grants access to all http requests
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use('/api/items', itemRoutes);
app.use('/api/menus', menuRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

module.exports = app;