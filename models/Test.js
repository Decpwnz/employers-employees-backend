const mongoose = require('mongoose');

const EmployeeSchema = mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  workplaceNumber: {
    type: Number,
    required: true,
  },
  lunchTime: {
    type: Number,
    required: true,
  },
});

const EmployerSchema = mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  availableHours: {
    type: {
      start: Number,
      end: Number,
    },
    required: true,
  },
});

const Employee = mongoose.model('Employee', EmployeeSchema);
const Employer = mongoose.model('Employer', EmployerSchema);

module.exports = {
  Employee,
  Employer,
};
