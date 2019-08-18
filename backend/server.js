require('dotenv-safe').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./configs/routes');

const app = express();
const server = require('http').Server(app);


mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useFindAndModify: false
})
app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(process.env.PORT || 3800);