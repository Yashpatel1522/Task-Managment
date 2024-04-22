const express = require("express");
const {
  searchTask,
  managerTasks,
  notifications,
} = require("../controller/managermodule/managertasks");
const taskCount = require("../controller/managermodule/taskCount");
const {
  employeeData,
  searchEmpData,
  removeEmployee,
} = require("../controller/managermodule/employeeData");
const updateManager = require("../controller/managermodule/updateManagerProfile");
const managerProfile = require("../controller/managermodule/getManagerProfile");
const dashboardView = require("../controller/managermodule/dashboard");
const employeeView = require("../controller/managermodule/employeeView");
const taskView = require("../controller/managermodule/taskView");
const upcomingTasks = require("../controller/managermodule/upcomingTasks");
const {
  addtaskdata,
  inserttaskdata,
} = require("../controller/managermodule/addtask");
const multer = require("multer");
const {
  upload,
  taskdetailfiles,
  userProfileStorage,
} = require("../utility/multer");
const addtaskdatamiddleware = require("../middleware/addtask");
const {
  addteamdata,
  getempdata,
  addteam,
} = require("../controller/managermodule/addteam");
const {
  teamdetails,
  searchTeamData,
  showTeamDataForUpdate,
  updateTeamData,
  teamDetailsForView,
  deleteTeam,
} = require("../controller/managermodule/teamdata");
const getTeams = require("../controller/managermodule/getTeams");
const passport = require("passport");

// const uploadImage = multer({ storage: userProfileStorage });
// const addtaskdatamiddleware = require('../middleware/addtask');

// const {upload, taskdetailfiles, userProfileStorage } = require("../utility/multer");
const uploadStorage = multer({ storage: taskdetailfiles });
// const uploadImage = multer({ storage: userProfileStorage });
const uploadImage = multer({ storage: userProfileStorage });

const managerRouter = express.Router();

// Displaying Tasks of manager
managerRouter.get("/", taskView().getPage);

// Displaying Employee details
managerRouter.get("/employeeDetails", employeeView().getPage);

managerRouter.get("/Teams", (request, response) => {
  response.render("./managermodule/teams");
});

// Dashboard
managerRouter.get("/dashboard",dashboardView().getPage);

// API to get team details of the particular manager
managerRouter.get("/getTeams", getTeams);

managerRouter.get("/teamapi", teamdetails);

//api to get upcoming manager tasks
managerRouter.get("/getManagerUpcomingTasks", upcomingTasks);

//api to Update Manager Profile Details
// managerRouter.post("/updateManager", uploadImage.single('profileimg'), updateManager);

//api to get Manager Profile Details
managerRouter.get("/getManagerProfile", managerProfile);

//api to get employee details
managerRouter.get("/getEmployees", employeeData);
managerRouter.get("/searchEmploye/:searchdata", searchEmpData);
managerRouter.delete("/removeemployeapi/:id", removeEmployee);
// api to get manager tasks
managerRouter.get("/getManagerTasks", managerTasks);

//api for Manager task Count
managerRouter.get("/getManagerTaskCount", taskCount);
managerRouter.get("/searchTask/:searchdata", searchTask);

// // api for get user,category from database
managerRouter.get("/getdataapi", addtaskdata);

// insert task data
managerRouter.post("/inserttask", upload.array("files"), inserttaskdata);

// serach task api
managerRouter.post("/searchtask", searchTask);

managerRouter.get("/notification", notifications);

// api to get only employe data for create team
managerRouter.get("/getempdata", getempdata);

managerRouter.post("/addteamdata", addteam);
managerRouter.get("/managerTeam/searchteam/:searchdata", searchTeamData);
managerRouter.get("/managerTeam/showteamdata/:id", showTeamDataForUpdate);
managerRouter.post("/updateteamdata", updateTeamData);
managerRouter.get("/teamapi/:id", teamDetailsForView);
managerRouter.delete("/deleteteamapi/:id", deleteTeam);

module.exports = managerRouter;
