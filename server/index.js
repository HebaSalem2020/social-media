const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const userRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const postRoute = require('./routes/posts');
dotenv.config();

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }, () => {
  console.log('Connected to MongoDB');
});

app.use(express.json());
app.use(helmet());
app.use(morgan('common'));

app.get('/', (req, res) => {
  res.send('Welcome to homepage');
});

app.get('/users', (req, res) => {
  res.send('Welcome to user page');
});

app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/posts', postRoute);

app.listen(8800, () => {
  console.log('Backend Server is running ...');
});
