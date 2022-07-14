const express = require('express');
const { append } = require('express/lib/response');
const router = express.Router();
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const groupController = require('../controllers/group');
const { groupValidation, results } = require('./validation');

router.get('/', groupController.getAll);

router.get('/:id', groupController.getSingle);

router.post('/', groupValidation, (req, res) => {
    const group = {
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

    const response = mongodb.getDb().db().collection('Group').insertOne(group);
    if (response.acknowledged) {
      res.status(201).json(response || 'Inserted successfully');
    } else {
      res.status(500).json(response.error);
    }
  });

router.put('/:id', groupValidation, (req, res)=> {
    const groupId = new ObjectId(req.params.id);
    const group = {
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
      .collection('Group')
      .replaceOne({ _id: groupId }, group);
    console.log(response);

    if (response.modifiedCount > 0) {
      res.status(201).send(response);
    } else {
      res.status(500).json(response.error);
    }

  });

router.delete('/:id', groupController.deleteGroup);

module.exports = router;


