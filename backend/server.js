const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const registerRouter = require('./routes/registerRoute');
const loginRouter = require('./routes/loginRoute');
const userListingsRouter = require('./routes/userListingsRoute');
const allListingsRouter = require('./routes/allListingsRoute');
const userCartRouter = require('./routes/userCartRoute');

app.use(express.json());
app.use(cors(
    {
        origin: 'http://localhost:5173',
        allowedHeaders: 'Content-Type, Authorization'
    }
))

app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/users', userListingsRouter);
app.use('/listings', allListingsRouter);
app.use('/carts', userCartRouter);

mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log('Successfully connected to database.'))
    .catch(err => console.log(err, 'Failed to connect to database.'));

app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}`));

