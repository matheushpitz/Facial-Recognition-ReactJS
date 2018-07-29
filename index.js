require('dotenv').config();
const app = require('express')();
const port = process.env.PORT || 8080;
// call server.
require('./server/server.js')(app, port);