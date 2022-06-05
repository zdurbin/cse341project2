const express = require('express');
const { requiresAuth } = require('express-openid-connect');
const { append } = require('express/lib/response');
const router = express.Router();

const todoController = require('../controllers/todo');
const { taskValidation, results } = require('./validation');

router.get('/profile', requiresAuth(), (req, res) =>{
  res.send(json.strignify(req.oidc.user));
});

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

router.put('/:id', taskValidation, (req, res)=> {
    const taskId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
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

    const response = mongodb
    .getDb()
    .db()
    .collection('Todo')
    .replaceOne({ _id: taskId }, task);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the task.');
  }

});

router.delete('/:id', todoController.deleteTask);

module.exports = router;


