const winston = require('winston');

const { Employee, Employer } = require('../models/Test');

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

const employeeSeedData = [
  {
    type: 'Employee', name: 'Sandra Affleck', salary: 343, workplaceNumber: 2, lunchTime: 11,
  },
];
const employerSeedData = [
  {
    type: 'Employer', name: 'Melanie Orange', salary: 777, availableHours: { start: 12, end: 18 },
  },
];

const seedDatabase = async () => {
  try {
    await Promise.all([
      Employee.deleteMany({}),
      Employer.deleteMany({}),
    ])
      .then(() => logger.info('Deleting database data'));

    await Promise.all([
      Employee.insertMany(employeeSeedData),
      Employer.insertMany(employerSeedData),
    ]);

    logger.info('Database populated with initial data.');
  } catch (error) {
    logger.error('An error occurred while populating the database:', error);
  }
};

module.exports = seedDatabase;
