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
const managerRouter = require('./routers/managerroute');
const login = require('./routers/loginroutes');

let PORT = process.env.PORT;

app.use("/bootstrap_icon_css",express.static("./node_modules/bootstrap-icons/font"));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/"))
);
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static(path.join(__dirname, '/node_modules/bootstrap/dist')))
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use("/bootstrape",express.static(path.join(__dirname,'/node_modules/bootstrap/dist')))
app.use("/sweetalert2",express.static(path.join(__dirname,'/node_modules/sweetalert2/dist')))
app.use("/boxicon",express.static(path.join(__dirname,'/node_modules/boxicons')))

// To test logger

app.listen(PORT, () => {
  console.log("listen portno is : " + PORT);
});

app.use('/admin', adminroute);
app.use('/employee', employeeroute);
app.use("/login",login)
app.use("/manager", managerroute);
