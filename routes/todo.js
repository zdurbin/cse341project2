const express = require('express');
const { append } = require('express/lib/response');
const router = express.Router();
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const todoController = require('../controllers/todo');
const { taskValidation, results } = require('./validation');

router.get('/', todoController.getAll);

router.get('/:id', todoController.getSingle);

router.post('/', taskValidation, (req, res) => {
    const task = {
      name: req.body.name,
      priorityLevel: req.body.priorityLevel,
      createdDate: req.body.createdDate,
      due: req.body.due,
      creator: req.body.creator,
      responsable: req.body.responsable,
      status: req.body.status,
      feedEntry: req.body.feedEntry,
      comment: req.body.comment,
      feed: req.body.feed,
      discription: req.body.discription
    };
    
    const _result = results(req);
    if (!_result.isEmpty()) {
        return res.status(500).json({ errors: _result.array() })
    };

    const response = mongodb.getDb().db().collection('Todo').insertOne(task);
    if (response.acknowledged) {
      res.status(201).json(response || 'Inserted successfully');
    } else {
      res.status(500).json(response.error);
    }
  });

router.put('/:id', taskValidation, (req, res)=> {
    const taskId = new ObjectId(req.params.id);
  const task = {
    name: req.body.name,
    priorityLevel: req.body.priorityLevel,
    createdDate: req.body.createdDate,
    due: req.body.due,
    creator: req.body.creator,
    responsable: req.body.responsable,
    status: req.body.status,
    feedEntry: req.body.feedEntry,
    comment: req.body.comment,
    feed: req.body.feed,
    discription: req.body.discription

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
    res.status(201).send(response);
  } else {
    res.status(500).json(response.error);
  }

});

router.delete('/:id', todoController.deleteTask);

module.exports = router;


