const express = require('express');
const Test = require('../models/Test');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const tests = await Test.find();
    res.json(tests);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.post('/', async (req, res) => {
  const test = new Test({
    name: req.body.name,
    age: req.body.age,
    description: req.body.description,
  });

  try {
    const savedTest = await test.save();
    res.status(201).json(savedTest);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const test = await Test.findById(req.params.id);
    if (!test) {
      return res.status(404).send('Test not found');
    }
    res.status(200).json(test);
  } catch (err) {
    res.status(404).json({ message: err });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const test = await Test.findByIdAndDelete(req.params.id);
    if (!test) {
      return res.status(404).send('Test not found');
    }
    res.status(204).send();
  } catch (err) {
    res.json({ message: err });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const test = await Test.findByIdAndUpdate(req.params.id, {
      $set: {
        name: req.body.name,
        age: req.body.age,
        description: req.body.description,
      },
    });
    if (!test) {
      return res.status(404).send('Test not found');
    }
    res.status(200).json({ messsage: `Succesfully updated: ${req.params.id}` });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const test = await Test.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!test) {
      return res.status(404).send('Test not found');
    }
    res.status(200).json({ messsage: `Succesfully updated: ${req.params.id}` });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
