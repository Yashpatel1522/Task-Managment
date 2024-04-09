const path = require('path');
const express = require('express');
const app = express();
const bodyparser = require('body-parser');
require('dotenv').config();
const ejs = require('ejs');
const logger = require('./logger/logger')

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

let PORT = process.env.PORT;

// To test logger

// app.get('/', (req, res)=> {
//   logger.info("First Log")
//   res.end();
// })

app.listen(PORT, () => {
  console.log("listen portno : " + PORT);
});