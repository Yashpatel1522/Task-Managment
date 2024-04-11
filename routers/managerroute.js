const express = require('express');
const { addtaskdata } = require('../controller/managermodule/addtask');
const managerRouter = express.Router();

// api for get user,category from database
managerRouter.get('/getdataapi',addtaskdata);

module.exports = managerRouter;
