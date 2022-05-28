const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  const result = await mongodb.getDb().db().collection('Todo').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res) => {
  const taskId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('Todo').find({ _id: taskId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createTask = async (req, res) => {
  const task = {
    taskName: req.body.taskName,
    startDate: req.body.startDate,
    dueDate: req.body.dueDate,
    taskPriority: req.body.taskPriority
  };
  const response = await mongodb.getDb().db().collection('Todo').insertOne(task);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while entering the task.');
  }
};

const updateTask = async (req, res) => {
  const taskId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const task = {
    taskName: req.body.taskName,
    startDate: req.body.startDate,
    dueDate: req.body.dueDate,
    taskPriority: req.body.taskPriority

  };
  const response = await mongodb
    .getDb()
    .db()
    .collection('Todo')
    .replaceOne({ _id: taskId }, task);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the updating.');
  }
};

const deleteTask = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('Todo').remove({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the task.');
  }
};

module.exports = {
  getAll,
  getSingle,
  createTask,
  updateTask,
  deleteTask
};