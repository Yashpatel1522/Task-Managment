const express = require("express");
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
const { adminCalender } = require("../controller/adminmodule/calender");
const { profiledata } = require("../controller/adminmodule/adminprofile");
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
} = require("../controller/adminmodule/teamdata");
const passport = require("passport");
const checkUserRole = require("../middleware/userrole");

const router = express.Router();
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

// Manager Api
router.get("/managersapi", adminManagers);
router.get("/managersapi/:id", managerDetails);
router.get("/managersapi/search/:searchdata", searchManData);
router.delete("/managersapi/:id", dataDelete);

// Employee Api
router.get("/employeesapi", adminEmployees);
router.get("/employeesapi/:id", employeeDetails);
router.get("/employeesapi/search/:searchdata", searchEmpData);
router.delete("/employeesapi/:id", empDataDelete);

// Team
router.get("/teamapi", teamData);
router.get("/teamapi/:id", teamDetails);
router.post("/newteam", addNewTeam);
router.get("/teamapi/search/:searchdata", searchTeam);
router.delete("/teamapi/:id", deleteTeam);

// Task Router
router.route("/tasksData").get(adminTasks);
router.get("/tasksData/:searchdata", searchTasks);
router.get("/tasksDetails/:id", taskDetail);

router.get("/profiledata", profiledata);
router.get("/chartsData", chartsData);
router.get("/managerTask", managerTask);

// Category
router.route("/categoryData").get(adminCategory);
router.get("/categoryData/:searchdata", searchCategory);
router.get("/categoryDetails/:id", categoryDetail);

router.post("/category", addCategory);
router.delete("/categoryData/:id", deleteCategory);

// Calender
router.route("/calender").get(adminCalender);

// router.use(checkUserRole);

module.exports = router;
