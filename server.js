const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const createError = require('http-errors');
const path = require('path');
const cors = require('cors');
const {taskValidation} = require('./validation.js');

const port = process.env.PORT || 3000;
const app = express();

app
  .use(express.json());
  app.use(bodyParser.json());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended :true
  }));
  app.get('/', (req, res) =>{
    res.send('Node js file uplod rest apis')
  });
  app.post('/task', taskValidation, (req, res, next) => {
    const createTask = async  (req, res) => {
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
  })
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  app.use('/', require('./routes'));
  app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "internal Server Error";
    res.status(err.statusCode).json({
      message: err.message,
    });
  });

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});