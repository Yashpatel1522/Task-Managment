const express = require('express');
const {searchTask, managerTasks, notifications } = require("../controller/managermodule/managertasks")
const taskCount = require("../controller/managermodule/taskCount")
const employeeData = require("../controller/managermodule/employeeData")
const { addtaskdata, inserttaskdata } = require('../controller/managermodule/addtask');
const addtaskdatamiddleware = require('../middleware/addtask')
const multer = require('multer'); 
const taskdetailfiles = require("../utility/multer");
const uploadStorage = multer({ storage: taskdetailfiles})
const managerRouter = express.Router();

managerRouter.get("/", (request, response)=> {
    response.render('./managermodule/managerdashboard')
})

managerRouter.get("/employeeDetails", (request, response)=> {
    response.render('./managermodule/employee')
})
managerRouter.get("/Teams",(request,response)=>{
    response.render('./managermodule/teams')
})

//api to Update Manager Profile Details
// managerRouter.post("/updateManager", updateManager);

//api to get Manager Profile Details
// managerRouter.get("/getManagerProfile", managerProfile);

//api to get employee details
managerRouter.get("/getEmployees", employeeData);

// api to get manager tasks
managerRouter.get("/getManagerTasks", managerTasks);

//api for Manager task Count
managerRouter.get("/getManagerTaskCount", taskCount)

// // api for get user,category from database
managerRouter.get('/getdataapi',addtaskdata);
// insert task data
// ,uploadStorage.array('')
managerRouter.post('/inserttask',addtaskdatamiddleware,uploadStorage.array("files"),inserttaskdata);
// serach task api
managerRouter.post('/searchtask',searchTask)

managerRouter.get('/notification',notifications)

module.exports = managerRouter;
