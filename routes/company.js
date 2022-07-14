const express = require('express');
const { append } = require('express/lib/response');
const router = express.Router();
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const companyController = require('../controllers/company');
const { taskValidation, results } = require('./validation');

router.get('/', companyController.getAll);

router.get('/:id', companyController.getSingle);

router.post('/', companyValidation, (req, res) => {
    const company = {
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

    const response = mongodb.getDb().db().collection('Company').insertOne(company);
    if (response.acknowledged) {
      res.status(201).json(response || 'Inserted successfully');
    } else {
      res.status(500).json(response.error);
    }
  });

router.put('/:id', companyValidation, (req, res)=> {
    const companyId = new ObjectId(req.params.id);
    const company = {
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
      .collection('Company')
      .replaceOne({ _id: companyId }, company);
    console.log(response);

    if (response.modifiedCount > 0) {
      res.status(201).send(response);
    } else {
      res.status(500).json(response.error);
    }

  });

router.delete('/:id', companyController.deleteCompany);

module.exports = router;


