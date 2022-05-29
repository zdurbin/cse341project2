const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
//const createError = require('http-errors');
const cors = require('cors');

const port = process.env.PORT || 3000;
const app = express();

app
  .use(express.json())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({
    extended :true
  }))
  .use(cors());

app.use('/', require('./routes'));

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});