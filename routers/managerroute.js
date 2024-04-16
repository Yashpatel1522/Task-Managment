const express = require('express');
const managerTask = require("../controller/managermodule/managertasks")
const taskCount = require("../controller/managermodule/taskCount")
const employeeData = require("../controller/managermodule/employeeData")
const { addtaskdata, inserttaskdata } = require('../controller/managermodule/addtask');
const addtaskdatamiddleware = require('../middleware/addtask')
const managerRouter = express.Router();

managerRouter.get("/", (request, response)=> {
    response.render('./managermodule/managerdashboard')
})

managerRouter.get("/employeeDetails", (request, response)=> {
    response.render('./managermodule/employee')
})

//api to get employee details
managerRouter.get("/getEmployees", employeeData);

// api to get manager tasks
managerRouter.get("/getManagerTasks", managerTask);

//api for Manager task Count
managerRouter.get("/getManagerTaskCount", taskCount)

// // api for get user,category from database
managerRouter.get('/getdataapi',addtaskdata);
// insert task data

managerRouter.post('/inserttask',addtaskdatamiddleware,inserttaskdata);


module.exports = managerRouter;
