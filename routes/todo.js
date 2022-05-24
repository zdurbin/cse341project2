const express = require('express');
const router = express.Router();

const todoController = require('../controllers/todo');

router.get('/', todoController.getAll);

router.get('/:id', todoController.getSingle);

router.post('/', todoController.createContact);

router.put('/:id', todoController.updateContact);

router.delete('/:id', todoController.deleteContact);

module.exports = router;