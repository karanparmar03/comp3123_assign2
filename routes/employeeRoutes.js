const express = require('express');
const Employee = require('../models/Employee');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Get all employees
router.get('/', authMiddleware, async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Add a new employee
router.post('/', authMiddleware, async (req, res) => {
  const { name, department, position, salary } = req.body;

  try {
    const newEmployee = new Employee({ name, department, position, salary });
    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (err) {
    res.status(400).json({ error: 'Invalid data' });
  }
});

// Update an employee
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedEmployee);
  } catch (err) {
    res.status(400).json({ error: 'Invalid data' });
  }
});

// Delete an employee
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(400).json({ error: 'Invalid ID' });
  }
});

module.exports = router;
