const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const routes = require('./routes');
const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

mongoose.connect('mongodb://127.0.0.1:27017/MovieTvShowDB').then(() => console.log('DB Connected'));

app.listen(3000, () => console.log('App is listening on port 3000...'));

