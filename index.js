require('dotenv').config();
const app = require('express')();
const port = process.env.PORT || 8080;

require('./server/server.js')(app, port);