const express = require('express');
const bodyParser = require('body-Parser');


const mountRoutes = require('./routes');


const app = express();
mountRoutes(app);



app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers',
  'Origin, X-Requested-WIth, Content-Type, Accept'
  );
  res.setHeader('Access-Control-Allow-Methods',
  'GET, POST, PATCH, PUT, OPTIONS, DELETE');
  next();
});






module.exports = app;
