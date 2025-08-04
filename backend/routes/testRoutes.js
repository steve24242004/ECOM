const express = require('express');
const router = express.Router();
const Test = require('../models/Test');

// Create dummy data
router.post('/', async (req, res) => {
  try {
    const newTest = new Test({ name: req.body.name });
    const saved = await newTest.save();
    res.json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all test data
router.get('/', async (req, res) => {
  try {
    const all = await Test.find();
    res.json(all);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
