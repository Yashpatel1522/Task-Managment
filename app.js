const path = require('path');
const express = require('express');
const app = express();
const bodyparser = require('body-parser');
require('dotenv').config();
const ejs = require('ejs');
const logger = require('./logger/logger')
const adminroute = require('./routers/adminroute')
const employeeroute = require('./routers/employeeroute')

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname,'public')));

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));


let PORT = process.env.PORT;

app.use("/css",express.static("./node_modules/bootstrap/dist/css"));
app.use("/js",express.static("./node_modules/bootstrap/dist/js"));

app.use('/admin', adminroute);
app.use('/employee', employeeroute);
// To test logger

// app.get('/', (req, res)=> {
//   logger.info("First Log")
//   res.end();
// })

app.listen(PORT, () => {
  console.log("listen portno : " + PORT);
});

