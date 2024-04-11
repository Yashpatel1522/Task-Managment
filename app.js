const path = require('path');
const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const cookieparser = require('cookie-parser');
app.use(cookieparser())
require('dotenv').config();
const ejs = require('ejs');
const logger = require('./logger/logger')
const adminroute = require('./routers/adminroute');
const login = require('./routers/loginroutes');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname,'public')));

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));


let PORT = process.env.PORT;


app.use('/admin', adminroute);

app.use("/login",login)
// To test logger

app.get('/', (req, res)=> {
  res.render('./managermodule/managerdashboard')
})

app.listen(PORT, () => {
  console.log("listen portno is : " + PORT);
});

app.use('/admin', adminroute);

