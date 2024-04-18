const express = require('express');
const {searchTask, managerTasks, notifications } = require("../controller/managermodule/managertasks")
const taskCount = require("../controller/managermodule/taskCount")
const employeeData = require("../controller/managermodule/employeeData")
const updateManager = require('../controller/managermodule/updateManagerProfile');
const managerProfile = require('../controller/managermodule/getManagerProfile');
const dashboardView = require('../controller/managermodule/dashboard');
const employeeView = require('../controller/managermodule/employeeView');
const taskView = require('../controller/managermodule/taskView');
const { addtaskdata, inserttaskdata } = require('../controller/managermodule/addtask');
const addtaskdatamiddleware = require('../middleware/addtask');
const { upload } = require('../utility/multer');

const multer = require('multer'); 
const { taskdetailfiles, userProfileStorage } = require("../utility/multer");
const uploadStorage = multer({ storage: taskdetailfiles})
const uploadImage = multer({ storage: userProfileStorage });

const managerRouter = express.Router();

// Displaying Tasks of manager
managerRouter.get("/", taskView().getPage);

// Displaying Employee details
managerRouter.get('/employeeDetails', employeeView().getPage)

// managerRouter.get("/employeeDetails", (request, response)=> {
//     response.render('./managermodule/employee')
// })

managerRouter.get("/Teams",(request,response)=>{
    response.render('./managermodule/teams')
});

// Dashboard
managerRouter.get('/dashboard', dashboardView().getPage)

//api to Update Manager Profile Details
managerRouter.post("/updateManager", uploadImage.single('profileimg'), updateManager);

//api to get Manager Profile Details
managerRouter.get("/getManagerProfile", managerProfile);

//api to get employee details
managerRouter.get("/getEmployees", employeeData);

// api to get manager tasks
managerRouter.get("/getManagerTasks", managerTasks);

//api for Manager task Count
managerRouter.get("/getManagerTaskCount", taskCount);

// // api for get user,category from database
managerRouter.get('/getdataapi',addtaskdata);
// insert task data
// ,uploadStorage.array('')
managerRouter.post('/inserttask',upload.array("files"),inserttaskdata);
// serach task api
managerRouter.post('/searchtask',searchTask)

managerRouter.get('/notification',notifications)

module.exports = managerRouter;