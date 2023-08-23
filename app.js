const express = require('express');
const dotenv = require('dotenv');
const listRouter = require('./Routes/listRoute');
const userRouter = require('./Routes/userRoute');
const globalErrorHandler = require('./Controllers/errController');

dotenv.config({ path: './config.env' });

const app = express();

app.use(express.json());

app.use('/api/v1/lists', listRouter);
app.use('/api/v1/users', userRouter);
app.use(globalErrorHandler);

module.exports = app;
