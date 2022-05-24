const express = require('express');
const router = express.Router();

const todoController = require('../controllers/todo');

router.get('/', todoController.getAll);

router.get('/:id', todoController.getSingle);

router.post('/', todoController.createTask);

router.put('/:id', todoController.updateTask);

router.delete('/:id', todoController.deleteTask);

module.exports = router;