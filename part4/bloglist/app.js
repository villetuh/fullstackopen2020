const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const blogsRouter = require('./controllers/blogs');
const config = require('./utils/config');

const app = express();

mongoose.connect(config.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(express.static('build'));
app.use(express.json());

app.use('/api/blogs', blogsRouter);

module.exports = app;