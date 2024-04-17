const express = require('express');
const {searchTask, managerTasks } = require("../controller/managermodule/managertasks")
const taskCount = require("../controller/managermodule/taskCount")
const employeeData = require("../controller/managermodule/employeeData")
const { addtaskdata, inserttaskdata } = require('../controller/managermodule/addtask');
const addtaskdatamiddleware = require('../middleware/addtask')
const multer = require('multer'); 
const taskdetailfiles = require("../utility/multer");
const updateManager = require('../controller/managermodule/updateManagerProfile');
const managerProfile = require('../controller/managermodule/getManagerProfile');
const uploadStorage = multer({ storage: taskdetailfiles})
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
managerRouter.get("/getManagerTasks", managerTasks);

//api for Manager task Count
managerRouter.get("/getManagerTaskCount", taskCount)

// // api for get user,category from database
managerRouter.get('/getdataapi',addtaskdata);
// insert task data
// ,uploadStorage.array('')
managerRouter.post('/inserttask',addtaskdatamiddleware,uploadStorage.single("file"),inserttaskdata);
// serach task api
managerRouter.get('/searchtask',searchTask)

module.exports = managerRouter;
