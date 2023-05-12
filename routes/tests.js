const express = require('express');

const { Employee, Employer } = require('../models/Test');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const [employees, employers] = await Promise.all([
      Employee.find(),
      Employer.find(),
    ]);
    const users = [...employees, ...employers];
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    let newRecord;

    if (req.body.type === 'Employee') {
      newRecord = new Employee({
        type: req.body.type,
        name: req.body.name,
        salary: req.body.salary,
        workplaceNumber: req.body.workplaceNumber,
        lunchTime: req.body.lunchTime,
      });
    }

    if (req.body.type === 'Employer') {
      newRecord = new Employer({
        type: req.body.type,
        name: req.body.name,
        salary: req.body.salary,
        availableHours: req.body.availableHours,
      });
    }

    const savedRecords = await newRecord.save();
    res.status(201).json(savedRecords);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const test = await Employee.findById(id)
    || await Employer.findById(id);
    if (!test) {
      return res.status(404).send('Employee or Employer not found');
    }
    return res.status(200).json(test);
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const test = await Employee.findByIdAndDelete(id)
    || await Employer.findByIdAndDelete(id);
    if (!test) {
      return res.status(404).send('Employee or Employer not found');
    }
    return res.status(204).send();
  } catch (err) {
    return res.json({ message: err });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    let newRecord;

    if (req.body.type === 'Employee') {
      newRecord = await Employee.findByIdAndUpdate(req.params.id, {
        type: req.body.type,
        name: req.body.name,
        salary: req.body.salary,
        workplaceNumber: req.body.workplaceNumber,
        lunchTime: req.body.lunchTime,
      });
    }

    if (req.body.type === 'Employer') {
      newRecord = await Employer.findByIdAndUpdate(req.params.id, {
        $set: {
          type: req.body.type,
          name: req.body.name,
          salary: req.body.salary,
          availableHours: req.body.availableHours,
        },
      });
    }
    if (!newRecord) {
      return res.status(404).send('Employee or Employer not found');
    }
    return res.status(200).json({ messsage: `Succesfully updated: ${req.params.id}` });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    let newRecord;

    if (req.body.type === 'Employee') {
      newRecord = await Employee.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
    }

    if (req.body.type === 'Employer') {
      newRecord = await Employer.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
    }
    if (!newRecord) {
      return res.status(404).send('Employer or Employee not found');
    }
    return res.status(200).json({ messsage: `Succesfully updated: ${req.params.id}` });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

module.exports = router;
