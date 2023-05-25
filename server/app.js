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

let server;

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
    server = app.listen(port, () => {
      console.log(`Server is running on ${port}`.yellow.bold);
    });

    io = require('socket.io')(server, {
      pingTimeout: 60000,
      cors: {
        origin: 'http://localhost:3000',
      },
    });

    io.on('connection', (socket) => {
      console.log('Connected to web socket');

      socket.on('auth user', (user) => {
        console.log('User authenticated: ' + user._id);
        // Create a new room for the user
        socket.join(user._id);
        socket.emit('connected');
      });

      // Create room for a chat
      socket.on('join chat', (chat) => {
        socket.join(chat._id);
        console.log('User joined room: ' + chat._id);
      });

      socket.on('send message', (message) => {
        const chat = message.chat;

        if (!chat.users || chat.users.length < 2) return console.log('No user');

        // Send to other user's room apart from the sender's room
        chat.users.forEach((user) => {
          if (user !== message.sender._id) {
            socket.in(user).emit('new message', message);
          }
        });
      });

      socket.on('typing', (chat) => {
        socket.in(chat._id).emit('typing', chat);
      });

      socket.on('stop typing', (chat) => {
        socket.in(chat._id).emit('stop typing', chat);
      });
    });
  })
  .catch((error) => {
    console.log(`Mongo DB error => ${error}`.red.bold);
  });
