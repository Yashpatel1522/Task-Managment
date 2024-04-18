const express = require("express");
const { adminDashboard, chartsData } = require("../controller/adminmodule/dashboard");
const { adminManagers, managerDetails, searchManData, dataDelete, managerpage } = require("../controller/adminmodule/managers");
const { adminEmployees, employeeDetails, searchEmpData, empDataDelete, employeepage } = require("../controller/adminmodule/employees");
const { adminTasks, searchTasks, taskpage, taskDetail } = require("../controller/adminmodule/tasks");
const { adminCalender } = require("../controller/adminmodule/calender");
const { profiledata } = require("../controller/adminmodule/adminprofile");
const { adminTeam, deleteTeam, teamData, teamDetails } = require("../controller/adminmodule/teamdata");

const router = express.Router();

// Page Render
router.route("/dashboard").get(adminDashboard);
router.route("/managers").get(managerpage);
router.route("/employees").get(employeepage);
router.route("/tasks").get(taskpage);
router.route("/team").get(adminTeam);

// Manager Api 
router.get("/managersapi", adminManagers);
router.get("/managersapi/:id", managerDetails);
router.get("/managersapi/search/:searchdata", searchManData)
router.delete("/managersapi/:id", dataDelete)

// Employee Api
router.get("/employeesapi", adminEmployees);
router.get("/employeesapi/:id", employeeDetails);
router.get("/employeesapi/search/:searchdata", searchEmpData)
router.delete("/employeesapi/:id", empDataDelete)

// Team
router.get("/teamapi", teamData);
router.get("/teamapi/:id", teamDetails);
router.delete("/teamapi/:id", deleteTeam)

// Task Router
router.route("/tasksData").get(adminTasks);
router.get("/tasksData/:searchdata", searchTasks)
router.get("/tasksDetails/:id", taskDetail)

router.get("/profiledata", profiledata)
router.get("/chartsData", chartsData)






// Calender
router.route("/calender").get(adminCalender);



module.exports = router

