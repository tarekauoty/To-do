const express = require('express');
const mongoose = require('mongoose');
const app = require('./app.js');

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('successfully connected to DB!');
  });

const port = 8080;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
