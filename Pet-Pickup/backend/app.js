const express = require('express');
const bodyParser = require('body-parser');

const mountRoutes = require('./routes');

const app = express();

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-HeadersOrigin, X-Requested-With, Content-Type, Accept, Authorization");
  //res.setHeader('Access-Control-Allow-Credentials', true);
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  mountRoutes(app);
  next();
});









module.exports = app;
