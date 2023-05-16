require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const colors = require('colors');
const helmet = require('helmet');
const xss = require('xss-clean');
const { notFound, errorHandler } = require('./utilities/errors');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());
app.use(helmet());
app.use(xss());
app.disable('x-powered-by');

app.get('/', (req, res) => res.status(200).send('Welcome to talkative API'));

app.all('*', notFound);
app.use(errorHandler);

const port = process.env.PORT || 3001;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on ${port}`.yellow.bold);
    });
  })
  .catch((error) => {
    console.log(`Mongo DB error => ${error}`.red.bold);
  });
