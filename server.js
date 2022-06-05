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

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});

const { auth } = require('express-openid-connect');
require('dotenv').config();
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.secret,
  baseURL: process.env.baseURL,
  clientID: process.env.clientID,
  issuerBaseURL: process.env.issuerBaseURL
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});