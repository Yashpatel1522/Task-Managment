const passport = require("passport");
const multer = require("multer");
require("../middleware/jwtpassport");

//authentication
const checkUserRole = require("../middleware/userrole");

//login module
const express = require("express");
const {
  loginPost,
  loginGet,
} = require("../controller/loginmodule/login.controller");
const { userProfileStorage, upload } = require("../utility/multer");
const {
  registrationPost,
} = require("../controller/loginmodule/registration.controller");
const {
  acticationGet,
  acticationPost,
} = require("../controller/loginmodule/activation.controller");
const {
  forgetGet,
  forgetPost,
} = require("../controller/loginmodule/forget.controller");
const workingEmployyeInTask = require("../controller/loginmodule/workingemployee.controllers");
const updateTaskDetailsPost = require("../controller/loginmodule/updatetask.controller");
const logout = require("../controller/loginmodule/logout.controller");
const {
  managerTasks,
} = require("../controller/loginmodule/managertasks.controller");
const { getuser } = require("../controller/loginmodule/getcurrentuser");
const {
  rolePermissionsGet,
  allPermissionsGet,
  displaySingleRoleHasPermissions,
} = require("../controller/loginmodule/rolpermissions");
const {
  updatePermission,
} = require("../controller/loginmodule/updatepermissions");
const {
  roleWiseSearchPermissionsGet,
} = require("../controller/loginmodule/rolewisesearchpermissions.controller");
const {
  deletePermissions,
} = require("../controller/loginmodule/deletepermissions");

//admin
const {
  socketGet,
  messageDisplay,
  socketPost,
} = require("../controller/adminmodule/socket.io");
const {
  searchCategory,
  deleteCategory,
  categoryDetail,
  adminCategory,
  addCategory,
  categoryPage,
} = require("../controller/adminmodule/category");
const {
  searchTasks,
  taskDetail,
  adminTasks,
  taskpage,
} = require("../controller/adminmodule/tasks");
const {
  searchTeam,
  deleteTeam,
  updateTeamData,
  teamDetails,
  teamData,
  addNewTeam,
  adminTeam,
} = require("../controller/adminmodule/teamdata");
const {
  searchEmpData,
  empDataDelete,
  employeeDetails,
  adminEmployees,
  employeepage,
} = require("../controller/adminmodule/employees");
const {
  searchManData,
  dataDelete,
  managerDetails,
  adminManagers,
  managerpage,
} = require("../controller/adminmodule/managers");
const {
  dueDateTask,
  calenderMonth,
  adminCalender,
} = require("../controller/adminmodule/calender");
const {
  updateAdminProfile,
  profiledata,
} = require("../controller/adminmodule/adminprofile");
const {
  managerTask,
  chartsData,
  adminDashboard,
} = require("../controller/adminmodule/dashboard");
const { getAllUsers } = require("../controller/adminmodule/getallusers");
const { messagesGet } = require("../controller/adminmodule/messages");
const { checkUserEmail } = require("../controller/adminmodule/checkuseremail");
const {
  calenderMonths,
  calenderView,
  dueDateTask1,
} = require("../controller/managermodule/calender");
const {
  searchEmpDatas,
  employeeData,
  removeEmployee,
} = require("../controller/managermodule/employeeData");
const {
  searchTask,
  managersTasks,
  searchsTask,
  notifications,
} = require("../controller/managermodule/managertasks");
const { messsageGet } = require("../controller/managermodule/messagepage");
const upcomingTasks = require("../controller/managermodule/upcomingTasks");
const managerProfile = require("../controller/managermodule/getManagerProfile");
const reportView = require("../controller/managermodule/getreport");
const getReportData = require("../controller/managermodule/getReportData");
const getPdfData = require("../controller/managermodule/getPdfData");
const { teamsGet } = require("../controller/managermodule/getteamspage");
const managerProfiles = require("../controller/managermodule/getManagerProfile");
const {
  inserttaskdata,
  addtaskdata,
} = require("../controller/managermodule/addtask");
const employeeView = require("../controller/managermodule/employeeView");
const taskView = require("../controller/managermodule/taskView");
const dashboardView = require("../controller/managermodule/dashboard");
const getTeams = require("../controller/managermodule/getTeams");
const editTask = require("../controller/managermodule/edittask");
const getEditDetails = require("../controller/managermodule/getEditTadkDetails");
const getAllTasks = require("../controller/managermodule/getalltasks");
const {
  teamdetails,
  showTeamDataForUpdate,
  updateTeamDatas,
  teamDetailsForView,
  deleteTeams,
} = require("../controller/managermodule/teamdata");
const taskCount = require("../controller/managermodule/taskCount");
const updateManager = require("../controller/managermodule/updateManagerProfile");
const { getempdata, addteam } = require("../controller/managermodule/addteam");
const {
  viewComments,
  getComments,
  updateTaskStatus,
} = require("../controller/managermodule/comments");
const taskCounts = require("../controller/managermodule/taskCount");
const {
  teamSearchDetails,
  teamList,
  teamDatas,
  teamsDetails,
} = require("../controller/employeemodule/employeeteam");
const {
  searchList,
  list,
  employeeTaskList,
  addComment,
} = require("../controller/employeemodule/employeetask");
const {
  getDashBoardData,
  dashBoard,
} = require("../controller/employeemodule/dashboard");
const { getUser } = require("../controller/employeemodule/userfetch");
const {
  getProfileData,
  updateProfileData,
} = require("../controller/employeemodule/employeeprofile");
const {
  getNavigationData,
} = require("../controller/employeemodule/navigation");
const {
  employeeCalender,
  empcalenderMonth,
  empdueDateTask,
} = require("../controller/employeemodule/canlender");
const { messageGet } = require("../controller/employeemodule/message");
const {
  reportGet,
  completedTasks,
} = require("../controller/employeemodule/reports");
const { profileUploadesMiddleware } = require("../middleware/photosvalidation");

//multer storage
//registration storage
const uploadStorage = multer({ storage: userProfileStorage });

//admin storage
const updateImage = multer({ storage: userProfileStorage });

//manager storage
const uploadImage = multer({ storage: userProfileStorage });

//employee router
const uploadStorageprofile = multer({ storage: userProfileStorage });

//main router
const router = express.Router();

//routers
const login = express.Router();
const adminRouter = express.Router();
const managerRouter = express.Router();
const employeeRouter = express.Router();

//dynemic name to router
router.get("/", loginGet);
router.use("/login", login);
router.use("/admin", adminRouter);
router.use("/manager", managerRouter);
router.use("/employee", employeeRouter);

login.post("/", loginPost);
login.post("/newpassword/:activationcode", acticationPost);

login.post(
  "/registration",
  uploadStorage.single("img"),
  profileUploadesMiddleware,
  registrationPost
);
//login routes
login.use(
  passport.authenticate("jwt", { session: false, failureRedirect: "/" })
);
login.get("/logout", logout);
login.get("/employee/:taskid", workingEmployyeInTask);
login.get("/newpassword/:activationcode", acticationGet);

login.get("/forget", forgetGet);
login.post("/forget", forgetPost);

//kanban
login.post("/updateKanban", updateTaskDetailsPost);
// login.get("/managertasks/:id", managerTasks);
login.get("/managertasks", managerTasks);

login.get("/user", getuser);

//rolepermisssions
login.get("/rolePerissions", rolePermissionsGet);
login.get("/allpermissions", allPermissionsGet);
login.post("/updatepermissions", updatePermission);
login.get("/rolehaspermission/:role", roleWiseSearchPermissionsGet);
login.get("/showpermissions", displaySingleRoleHasPermissions);
login.post("/deletepermissions", deletePermissions);

//admin routers without checkousers
adminRouter.get(
  "/managersapi/search/:searchdata",
  passport.authenticate("jwt", { session: false, failureRedirect: "/" }),
  searchManData
);

adminRouter.get(
  "/employeesapi/search/:searchdata",
  passport.authenticate("jwt", { session: false, failureRedirect: "/" }),
  searchEmpData
);

adminRouter.get(
  "/teamapi/search/:searchdata",
  passport.authenticate("jwt", { session: false, failureRedirect: "/" }),
  searchTeam
);

adminRouter.get(
  "/tasksData/:searchdata",
  passport.authenticate("jwt", { session: false, failureRedirect: "/" }),
  searchTasks
);

adminRouter.get(
  "/categoryData/:searchdata",
  passport.authenticate("jwt", { session: false, failureRedirect: "/" }),
  searchCategory
);

adminRouter.get(
  "/socket/:email",
  passport.authenticate("jwt", { session: false, failureRedirect: "/" }),
  socketGet
);
//manager without authentication

managerRouter.get(
  "/calenderData/:month",
  passport.authenticate("jwt", { session: false, failureRedirect: "/" }),
  calenderMonths
);
managerRouter.get(
  "/searchEmploye/:searchdata",
  passport.authenticate("jwt", { session: false, failureRedirect: "/" }),
  searchEmpDatas
);

managerRouter.get(
  "/searchTask/:searchdata",
  passport.authenticate("jwt", { session: false, failureRedirect: "/" }),
  searchsTask
);

//employee router without checkusers
employeeRouter.get(
  "/teamsearchdetails/:searchteam",
  passport.authenticate("jwt", { session: false, failureRedirect: "/" }),
  teamSearchDetails
);
employeeRouter.get(
  "/searchtask/:searchresult",
  passport.authenticate("jwt", { session: false, failureRedirect: "/" }),
  searchList
);

adminRouter.use(
  passport.authenticate("jwt", { session: false, failureRedirect: "/" }),
  checkUserRole
);
//admin with checkusers
//socket
adminRouter.post("/socket", socketPost);
adminRouter.post("/checkuseremail", checkUserEmail);
adminRouter.post("/messagedisplay", messageDisplay);
adminRouter.get("/messages", messagesGet);
adminRouter.get("/allusers", getAllUsers);

// Page Render
adminRouter.route("/dashboard").get(adminDashboard);
adminRouter.route("/managers").get(managerpage);
adminRouter.route("/employees").get(employeepage);
adminRouter.route("/tasks").get(taskpage);
adminRouter.route("/team").get(adminTeam);
adminRouter.route("/category").get(categoryPage);
adminRouter.route("/calender").get(adminCalender);

// Dashboard
adminRouter.get("/profiledata", profiledata);
adminRouter.get("/chartsData", chartsData);
adminRouter.get("/managerTask", managerTask);
adminRouter.post(
  "/profile",
  updateImage.single("profileimg"),
  updateAdminProfile
);

// Insert Data
adminRouter.post("/newteam", addNewTeam);
adminRouter.post("/category", addCategory);

// Manager Api
adminRouter.get("/managersapi", adminManagers);
adminRouter.get("/managersapi/:id", managerDetails);
adminRouter.delete("/managersapi/:id", dataDelete);

// Employee Api
adminRouter.get("/employeesapi", adminEmployees);
adminRouter.get("/employeesapi/:id", employeeDetails);
adminRouter.delete("/employeesapi/:id", empDataDelete);

// Team
adminRouter.get("/teamapi", teamData);
adminRouter.get("/teamapi/:id", teamDetails);
adminRouter.post("/teamapi/:id", updateTeamData);
adminRouter.delete("/teamapi/:id", deleteTeam);

// Task Router
adminRouter.get("/tasksData", adminTasks);
adminRouter.get("/tasksDetails/:id", taskDetail);

// Category
adminRouter.get("/categoryData", adminCategory);
adminRouter.get("/categoryDetails/:id", categoryDetail);
adminRouter.delete("/categoryData/:id", deleteCategory);

// Calender
adminRouter.get("/calenderData/:month", calenderMonth);
adminRouter.get("/dueDateOfTask", dueDateTask);

managerRouter.use(
  passport.authenticate("jwt", { session: false, failureRedirect: "/" })
);

managerRouter.get("/notification", notifications);
managerRouter.get("/getempdata", getempdata);

managerRouter.post("/addteamdata", addteam);
managerRouter.get("/managerTeam/showteamdata/:id", showTeamDataForUpdate);
managerRouter.post("/updateteamdata", updateTeamDatas);
managerRouter.get("/teamapi/:id", teamDetailsForView);
managerRouter.delete("/deleteteamapi/:id", deleteTeams);
managerRouter.get("/comments/:teamId", viewComments);
managerRouter.get("/getcomments/:teamId", getComments);
managerRouter.post("/updateTaskStatus", updateTaskStatus);

managerRouter.get("/calender", calenderView);
managerRouter.get("/dueDateOfTask", dueDateTask1);
managerRouter.get("/getManagerTaskCount", taskCounts);
managerRouter.get("/getPdfData", getPdfData);

managerRouter.use(
  passport.authenticate("jwt", { session: false, failureRedirect: "/" }),
  checkUserRole
);
//=======================================================================manager routes checkusers======================================
managerRouter.get("/message", messsageGet);
managerRouter.get("/getManagerUpcomingTasks", upcomingTasks);
managerRouter.get("/getManagerProfile/:id", managerProfile);
managerRouter.get("/getReport", reportView);
managerRouter.get("/getReportData", getReportData);
managerRouter.get("/Teams", teamsGet);

managerRouter.get("/getManagerProfile/:id", managerProfiles);
managerRouter.post("/inserttask", upload.array("files"), inserttaskdata);
managerRouter.get("/employeeDetails", employeeView);

managerRouter.get("/tasks", taskView().getPage);

managerRouter.get("/dashboard", dashboardView);
managerRouter.get("/getTeams", getTeams);
managerRouter.post("/editTaskDetails", editTask);
managerRouter.get("/getEditTadkDetails", getEditDetails);
managerRouter.get("/getTaskDetails/:id", getAllTasks);
managerRouter.get("/teamapi", teamdetails);
managerRouter.get("/getManagerTaskCount", taskCount);

//multer manager
managerRouter.post(
  "/updateManager",
  uploadImage.single("profileimg"),
  updateManager
);
managerRouter.get("/getEmployees", employeeData);
managerRouter.delete("/removeemployeapi/:id", removeEmployee);
managerRouter.get("/getManagerTasks", managersTasks);

managerRouter.get("/getdataapi", addtaskdata);

//=======================================================================employee routes checkusers======================================
employeeRouter.use(
  passport.authenticate("jwt", { session: false, failureRedirect: "/" }),
  checkUserRole
);
employeeRouter.get("/getdashboardata", getDashBoardData);
employeeRouter.get("/dashboard", dashBoard);
employeeRouter.get("/getUser", getUser);

employeeRouter.get("/getprofiledata", getProfileData);
employeeRouter.post(
  "/updateprofile",
  uploadStorageprofile.single("profileimg"),
  updateProfileData
);
employeeRouter.get("/getnavigationdata", getNavigationData);
employeeRouter.get("/task", list);
employeeRouter.get("/employeetasklist", employeeTaskList);
employeeRouter.post(
  "/addcomment/:id/:taskid",
  upload.single("file"),
  addComment
);

employeeRouter.get("/teamdata", teamList);
employeeRouter.get("/teamdetailsdata", teamDatas);
employeeRouter.get("/teamdetails/:teamid", teamsDetails);
employeeRouter.get("/calender", employeeCalender);
employeeRouter.get("/calenderData/:month", empcalenderMonth);
employeeRouter.get(
  "/dueDateOfTask",

  empdueDateTask
);
employeeRouter.get("/messages", messageGet);
employeeRouter.get("/report", reportGet);
employeeRouter.get("/comeletedTasks", completedTasks);

//exports main router
module.exports = router;
