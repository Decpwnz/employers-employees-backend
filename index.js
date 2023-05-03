const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const testsRoute = require('./routes/tests');
require('dotenv/config');

const app = express();

app.use(bodyParser.json());
app.use('/testDB', testsRoute);

mongoose
  .connect(process.env.DB_CONNECTION_STRING)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log('You got an error', error));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is runnig on port ${PORT}`));
