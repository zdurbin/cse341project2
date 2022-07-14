// const res = require('express/lib/response');
// const mongodb = require('../db/connect');
// const ObjectId = require('mongodb').ObjectId;

// const getAll = async (req, res) => {
//   const result = await mongodb.getDb().db().collection('Group').find();
//   result.toArray().then((lists) => {
//     res.setHeader('Content-Type', 'application/json');
//     res.status(200).json(lists);
//   });
// };

// const getSingle = async (req, res) => {
//   const groupId = new ObjectId(req.params.id);
//   const result = await mongodb.getDb().db().collection('Group').find({ _id: groupId });
//   result.toArray().then((lists) => {
//     res.setHeader('Content-Type', 'application/json');
//     res.status(200).json(lists[0]);
//   });
// };

// const deleteGroup = async (req, res) => {
//   const groupId = new ObjectId(req.params.id);
//   const response = await mongodb.getDb().db().collection('Group').remove({ _id: groupId }, true);
//   console.log(response);
//   if (response.deletedCount > 0) {
//     res.status(204).send();
//   } else {
//     res.status(500).json(response.error || 'Some error occurred while deleting the group.');
//   }
// };

// module.exports = {
//   getAll,
//   getSingle,
//   deleteGroup
// };