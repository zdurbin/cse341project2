const express = require('express');
const { append } = require('express/lib/response');
const router = express.Router();
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const userController = require('../controllers/user');
const { userValidation, results } = require('./validation');

router.get('/', userController.getAll);

router.get('/:id', userController.getSingle);

router.post('/', userValidation, (req, res) => {
    const user = {  
        userFirstName: req.body.userFirstName,
        userLastName: req.body.userLastName,
        userEmail: req.body.userEmail,
        userBirthdate: req.body.userBirthdate,
        userPosition: req.body.userPosition,
        userEmploymentStatus: req.body.userEmploymentStatus,
        userSalary: req.body.UserSalary,
        userTodoPromissions: req.body.userTodoPromissions
    };
    
    const _result = results(req);
    if (!_result.isEmpty()) {
        return res.status(500).json({ errors: _result.array() })
    };

    const response = mongodb.getDb().db().collection('User').insertOne(user);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while entering the user.');
    }
  });

router.put('/:id', userValidation, (req, res)=> {
    const userId = new ObjectId(req.params.id);
  const user = {  
    userFirstName: req.body.userFirstName,
    userLastName: req.body.userLastName,
    userEmail: req.body.userEmail,
    userBirthdate: req.body.userBirthdate,
    userPosition: req.body.userPosition,
    userEmploymentStatus: req.body.userEmploymentStatus,
    userSalary: req.body.UserSalary,
    userTodoPromissions: req.body.userTodoPromissions
  };

  const _result = results(req);
    if (!_result.isEmpty()) {
        return res.status(500).json({ errors: _result.array() })
    };

    const response = mongodb
    .getDb()
    .db()
    .collection('User')
    .replaceOne({ _id: userId }, user);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the user.');
  }

});

router.delete('/:id', userController.deleteUser);

module.exports = router;