const path = require('path');
const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const cookieparser = require('cookie-parser');
app.use(cookieparser())
require('dotenv').config();
const ejs = require('ejs');
const logger = require('./logger/logger')
const adminroute = require('./routers/adminroute')
const employeeroute = require('./routers/employeeroute');
const managerroute = require('./routers/managerroute');

app.use("/css",express.static("./node_modules/bootstrap/dist/css"));
app.use("/js",express.static("./node_modules/bootstrap/dist/js"));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/"))
);
app.use(express.static(path.join(__dirname,'public')));

app.use(express.static(path.join(__dirname,'/node_modules/bootstrap/dist')))
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));



// To test logger
let PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("listen portno is : " + PORT);
});

app.use('/admin', adminroute);
app.use('/employee', employeeroute);
app.use("/manager", managerroute);

app.use("/css", express.static("./node_modules/bootstrap/dist/css"));
app.use("/js", express.static("./node_modules/bootstrap/dist/js"));


