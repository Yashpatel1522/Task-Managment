const path = require('path');
const express = require('express');
const app = express();
const bodyparser = require('body-parser');
require('dotenv').config();
const ejs = require('ejs');
const logger = require('./logger/logger')
const adminroute = require('./routers/adminroute')
const managerRouter = require('./routers/managerroute')
const employeeroute = require('./routers/employeeroute')




app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/"))
);
app.use(express.static(path.join(__dirname,'public')));

app.use(express.static(path.join(__dirname,'/node_modules/bootstrap/dist')))
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.static("public/"));



// To test logger
let PORT = process.env.PORT;

app.get('/', (req, res)=> {
  res.render('./managermodule/managerdashboard')
})

app.listen(PORT, () => {
  console.log("listen portno is : " + PORT);
});

app.use('/admin', adminroute);
app.use(managerRouter);


