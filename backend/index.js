require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { errorHandler } = require('./src/middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const { userRoute } = require('./src/routes');

app.use('/', [userRoute]);
app.use(errorHandler);

app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
