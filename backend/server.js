require('dotenv').config();
const express = require('express');

const { errorHandler } = require('./src/middlewares/errorHandler');

const app = express();

app.use(express.json());

const { userRoute, accountRoute } = require('./src/routes');

app.use('/', [userRoute, accountRoute]);
app.use(errorHandler);

module.exports = { app };
