const express = require('express');
const managerTask = require("../controller/managermodule/managertasks");
const taskCount = require("../controller/managermodule/taskCount");
const employeeData = require("../controller/managermodule/employeeData");
const managerProfile = require("../controller/managermodule/getManagerProfile");
const { addtaskdata } = require('../controller/managermodule/addtask');
const updateManager = require('../controller/managermodule/updateManagerProfile');
const managerRouter = express.Router();

managerRouter.get("/", (request, response)=> {
    response.render('./managermodule/managerdashboard')
})

managerRouter.get("/employeeDetails", (request, response)=> {
    response.render('./managermodule/employee')
})

//api to Update Manager Profile Details
managerRouter.post("/updateManager", updateManager);

//api to get Manager Profile Details
managerRouter.get("/getManagerProfile", managerProfile);

//api to get employee details
managerRouter.get("/getEmployees", employeeData);

// api to get manager tasks
managerRouter.get("/getManagerTasks", managerTask);

//api for Manager task Count
managerRouter.get("/getManagerTaskCount", taskCount)

// // api for get user,category from database
// managerRouter.get('/getdataapi',addtaskdata);

module.exports = managerRouter;
