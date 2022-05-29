const express = require('express');
const router = express.Router();

const todoController = require('../controllers/todo');
const { taskValidation, results } = require('./validation');

router.get('/', todoController.getAll);

router.get('/:id', todoController.getSingle);

//router.post('/', todoController.createTask);
router.post('/', taskValidation, (req, res) => {
    const task = {
      taskName: req.body.taskName,
      startDate: req.body.startDate,
      dueDate: req.body.dueDate,
      taskPriority: req.body.taskPriority
    };
    
    const _result = results(req);
    if (!_result.isEmpty()) {
        return res.status(500).json({ errors: _result.array() })
    };

    const response = mongodb.getDb().db().collection('Todo').insertOne(task);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while entering the task.');
    }
  });

router.put('/:id', taskValidation, (req, res)=> {});

router.delete('/:id', todoController.deleteTask);

module.exports = router;