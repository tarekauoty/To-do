const express = require('express');
const dotenv = require('dotenv');
const listRouter = require('./Routes/listRoute');
const userRouter = require('./Routes/userRoute');
dotenv.config({ path: './config.env' });

const app = express();

app.use(express.json());

app.use('/api/v1/lists', listRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
