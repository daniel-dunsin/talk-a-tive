require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const colors = require('colors');
const helmet = require('helmet');
const xss = require('xss-clean');
const { notFound, errorHandler } = require('./utilities/errors');

const authRoutes = require('./routes/auth.route');
const chatRoutes = require('./routes/chat.route');
const messagesRoutes = require('./routes/messages.route');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());
app.use(helmet());
app.use(xss());
app.disable('x-powered-by');

app.get('/', (req, res) => res.status(200).send('Welcome to talkative API'));

app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/message', messagesRoutes);

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
