// const express = require("express");
// const {
//   searchsTask,
//   managersTask,
//   notifications,
// } = require("../controller/managermodule/managertasks");
// const taskCount = require("../controller/managermodule/taskCount");
// const {
//   employeeData,
//   searchEmpData,
//   removeEmployee,
// } = require("../controller/managermodule/employeeData");
// const updateManager = require("../controller/managermodule/updateManagerProfile");
// const managerProfile = require("../controller/managermodule/getManagerProfile");
// const dashboardView = require("../controller/managermodule/dashboard");
// const employeeView = require("../controller/managermodule/employeeView");
// const taskView = require("../controller/managermodule/taskView");
// const getAllTasks = require("../controller/managermodule/getalltasks");
// const upcomingTasks = require("../controller/managermodule/upcomingTasks");
// const editTask = require("../controller/managermodule/edittask");
// const {
//   addtaskdata,
//   inserttaskdata,
// } = require("../controller/managermodule/addtask");
// const multer = require("multer");
// const {
//   upload,
//   taskdetailfiles,
//   userProfileStorage,
// } = require("../utility/multer");
// const addtaskdatamiddleware = require("../middleware/addtask");
// const {
//   addteamdata,
//   getempdata,
//   addteam,
// } = require("../controller/managermodule/addteam");
// const {
//   teamdetails,
//   showTeamDataForUpdate,
//   updateTeamData,
//   teamDetailsForView,
//   deleteTeam,
//   updateTeamDatas,
//   deleteTeams,
// } = require("../controller/managermodule/teamdata");
// const getTeams = require("../controller/managermodule/getTeams");
// const getEditDetails = require("../controller/managermodule/getEditTadkDetails");
// const passport = require("passport");
// const {
//   viewComments,
//   getComments,
//   updateTaskStatus,
// } = require("../controller/managermodule/comments");
// const checkUserRole = require("../middleware/userrole");
// const {
//   calenderView,
//   calenderMonth,
//   dueDateTask1,
// } = require("../controller/managermodule/calender");
// const { reportGet } = require("../controller/employeemodule/reports");
// const { messsageGet } = require("../controller/managermodule/messagepage");
// const reportView = require("../controller/managermodule/getreport");
// const getReportData = require("../controller/managermodule/getReportData");
// const getPdfData = require("../controller/managermodule/getPdfData");
// const taskCounts = require("../controller/managermodule/taskCount");

// // const uploadStorage = multer({ storage: taskdetailfiles });
// const uploadImage = multer({ storage: userProfileStorage });

// const managerRouter = express.Router();

// // managerRouter.get(
// //   "/calenderData/:month",
// //   passport.authenticate("jwt", { session: false, failureRedirect: "/" }),
// //   calenderMonth
// // );
// // managerRouter.get(
// //   "/searchEmploye/:searchdata",
// //   passport.authenticate("jwt", { session: false, failureRedirect: "/" }),
// //   searchEmpData
// // );

// // managerRouter.get(
// //   "/searchTask/:searchdata",
// //   passport.authenticate("jwt", { session: false, failureRedirect: "/" }),
// //   searchTask
// // );

// // managerRouter.use(
// //   passport.authenticate("jwt", { session: false, failureRedirect: "/" }),
// //   checkUserRole
// // );


// // managerRouter.get("/message", messsageGet);
// // managerRouter.get("/getManagerUpcomingTasks", upcomingTasks);
// // managerRouter.get("/getManagerProfile/:id", managerProfile);
// // managerRouter.get("/getReport", reportView);
// // managerRouter.get("/getReportData", getReportData);
// // managerRouter.get("/getPdfData", getPdfData);

// // managerRouter.get("/getManagerProfile/:id", managerProfile);

// // managerRouter.post("/inserttask", upload.array("files"), inserttaskdata);
// // managerRouter.get("/employeeDetails", employeeView);

// // managerRouter.get("/Teams", (request, response) => {
  
// // });

// // managerRouter.get("/tasks", taskView().getPage);

// // Dashboard
// // managerRouter.get("/dashboard", dashboardView);
// // managerRouter.post("/inserttask", upload.array("files"), inserttaskdata);
// // managerRouter.get("/getTeams", getTeams);

// //API to edit task Details
// // managerRouter.post("/editTaskDetails", editTask);
// // managerRouter.get("/getEditTadkDetails", getEditDetails);
// // managerRouter.get("/getTaskDetails/:id", getAllTasks);
// // managerRouter.get("/teamapi", teamdetails);
// // managerRouter.get("/getManagerTaskCount", taskCount);

// //api to Update Manager Profile Details
// // managerRouter.post(
// //   "/updateManager",
// //   uploadImage.single("profileimg"),
// //   updateManager
// // );

// //api to get Manager Profile Details
// // managerRouter.get("/getManagerProfile/:id", managerProfile);
// //api to get employee details
// // managerRouter.get("/getEmployees", employeeData);
// // managerRouter.delete("/removeemployeapi/:id", removeEmployee);
// // managerRouter.get("/getManagerTasks", managerTask);

// // // api for get user,category from database
// // managerRouter.get("/getdataapi", addtaskdata);

// // serach task api
// // managerRouter.post("/searchtask", searchsTask);
// // managerRouter.get("/notification", notifications);

// // api to get only employe data for create team
// // managerRouter.get("/getempdata", getempdata);

// // managerRouter.post("/addteamdata", addteam);
// // managerRouter.get("/managerTeam/showteamdata/:id", showTeamDataForUpdate);
// // managerRouter.post("/updateteamdata", updateTeamDatas);
// // managerRouter.get("/teamapi/:id", teamDetailsForView);
// // managerRouter.delete("/deleteteamapi/:id", deleteTeams);

// // managerRouter.get("/comments/:teamId", viewComments);
// // managerRouter.get("/getcomments/:teamId", getComments);
// // managerRouter.post("/updateTaskStatus", updateTaskStatus);

// // managerRouter.get("/calender", calenderView);
// // managerRouter.get("/dueDateOfTask", dueDateTask1);
// // managerRouter.get("/getManagerTaskCount", taskCounts);

// module.exports = managerRouter;
