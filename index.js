const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const winston = require('winston');

const testsRoute = require('./routes/tests');

require('dotenv/config');

const app = express();

app.use(bodyParser.json());
app.use('/testDB', testsRoute);

const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
      ),
    }),
  ],
});

mongoose
  .connect(process.env.DB_CONNECTION_STRING)
  .then(() => logger.info('Connected to MongoDB'))
  .catch((error) => logger.error('Error connecting to MongoDB', error));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => logger.info(`Server is runnig on port ${PORT}`));
