const res = require('express/lib/response');
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  const result = await mongodb.getDb().db().collection('User').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('User').find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createUser = async  (req, res) => {
  const User = {
    userFirstName: req.body.userFirstName,
    userLastName: req.body.userLastName,
    userEmail: req.body.userEmail,
    userBirthdate: req.body.userBirthdate,
    userPosition: req.body.userPosition,
    userProfilePicture: req.body.userProfilePicture,
    userEmploymentStatus: req.body.userEmploymentStatus,
    userSalary: req.body.UserSalary,
    userTodoPromissions: req.body.userTodoPromissions
  };

  const response = await mongodb.getDb().db().collection('User').insertOne(user);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while entering the task.');
  }
};

const updateUser = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const User = { 
    userFirstName: req.body.userFirstName,
    userLastName: req.body.userLastName,
    userEmail: req.body.userEmail,
    userBirthdate: req.body.userBirthdate,
    userPosition: req.body.userPosition,
    userProfilePicture: req.body.userProfilePicture,
    userEmploymentStatus: req.body.userEmploymentStatus,
    userSalary: req.body.UserSalary,
    userTodoPromissions: req.body.userTodoPromissions
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection('User')
    .replaceOne({ _id: userId }, task);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the updating.');
  }
};

const deleteUser = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('User').remove({ _id: userId }, true);
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
  createUser,
  updateUser,
  deleteUser
};