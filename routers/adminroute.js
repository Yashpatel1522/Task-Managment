const express = require("express");
const passport = require("passport");
const multer = require("multer");
const router = express.Router();
const {
  adminDashboard,
  chartsData,
  managerTask,
} = require("../controller/adminmodule/dashboard");
const {
  adminManagers,
  managerDetails,
  searchManData,
  dataDelete,
  managerpage,
} = require("../controller/adminmodule/managers");
const {
  adminEmployees,
  employeeDetails,
  searchEmpData,
  empDataDelete,
  employeepage,
} = require("../controller/adminmodule/employees");
const {
  adminTasks,
  searchTasks,
  taskpage,
  taskDetail,
} = require("../controller/adminmodule/tasks");
const {
  adminCalender,
  calenderMonth,
  dueDateTask,
} = require("../controller/adminmodule/calender");
const {
  profiledata,
  updateAdminProfile,
} = require("../controller/adminmodule/adminprofile");
const {
  categoryPage,
  adminCategory,
  searchCategory,
  categoryDetail,
  addCategory,
  deleteCategory,
} = require("../controller/adminmodule/category");
const {
  adminTeam,
  deleteTeam,
  teamData,
  teamDetails,
  searchTeam,
  addNewTeam,
  updateTeamData,
} = require("../controller/adminmodule/teamdata");
const { userProfileStorage } = require("../utility/multer");
const updateImage = multer({ storage: userProfileStorage });
// const passport = require("passport");
const checkUserRole = require("../middleware/userrole");
router.get("/employeesapi/search/:searchdata", searchEmpData);
router.get("/managersapi/search/:searchdata", searchManData);
router.route("/tasksData").get(adminTasks);
router.get("/tasksData/:searchdata", searchTasks);
router.get("/tasksDetails/:id", taskDetail);

router.use(
  passport.authenticate("jwt", { session: false, failureRedirect: "/" }),
  checkUserRole
);
// Page Render
router.route("/dashboard").get(adminDashboard);
router.route("/managers").get(managerpage);
router.route("/employees").get(employeepage);
router.route("/tasks").get(taskpage);
router.route("/team").get(adminTeam);
router.route("/category").get(categoryPage);
router.route("/calender").get(adminCalender);

// Dashboard
router.get("/profiledata", profiledata);
router.get("/chartsData", chartsData);
router.get("/managerTask", managerTask);
router.post("/profile", updateImage.single("profileimg"), updateAdminProfile);

// Insert Data
router.post("/newteam", addNewTeam);
router.post("/category", addCategory);

// Manager Api
router.get("/managersapi", adminManagers);
router.get("/managersapi/:id", managerDetails);
router.delete("/managersapi/:id", dataDelete);

// Employee Api
router.get("/employeesapi", adminEmployees);
router.get("/employeesapi/:id", employeeDetails);
router.delete("/employeesapi/:id", empDataDelete);

// Team
router.get("/teamapi", teamData);
router.get("/teamapi/:id", teamDetails);
router.post("/teamapi/:id", updateTeamData);
router.get("/teamapi/search/:searchdata", searchTeam);
router.delete("/teamapi/:id", deleteTeam);

// Task Router

// Category
router.get("/categoryData", adminCategory);
router.get("/categoryData/:searchdata", searchCategory);
router.get("/categoryDetails/:id", categoryDetail);
router.delete("/categoryData/:id", deleteCategory);

// Calender
router.get("/calenderData/:month", calenderMonth);
router.get("/dueDateOfTask", dueDateTask);

module.exports = router;
