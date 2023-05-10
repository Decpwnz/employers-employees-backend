const winston = require('winston');

const Test = require('../models/Test');

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

const testSeedData = [
  { name: 'John Doe', age: 1, description: 'password1' },
  { name: 'Jane Smith', age: 2, description: 'password2' },
  { name: 'Bob Johnson', age: 3, description: 'password3' },
];

const seedDatabase = async () => {
  try {
    await Test.deleteMany({})
      .then(() => logger.info('Deleting database data'));

    await Test.insertMany(testSeedData);

    logger.info('Database populated with initial data.');
  } catch (error) {
    logger.error('An error occurred while populating the database:', error);
  }
};

module.exports = seedDatabase;
