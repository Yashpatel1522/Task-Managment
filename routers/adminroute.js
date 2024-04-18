const express = require("express");
const { adminDashboard } = require("../controller/adminmodule/dashboard");
const { adminManagers, managerDetails, searchManData, dataDelete, managerpage } = require("../controller/adminmodule/managers");
const { adminEmployees, employeeDetails, searchEmpData, empDataDelete, employeepage } = require("../controller/adminmodule/employees");
const { adminTasks, searchTasks, taskpage } = require("../controller/adminmodule/tasks");
const { adminTasktrack } = require("../controller/adminmodule/tasktrack");
const { adminCalender } = require("../controller/adminmodule/calender");
const router = express.Router();

// Page Render
router.route("/dashboard").get(adminDashboard);
router.route("/managers").get(managerpage);
router.route("/employees").get(employeepage);
router.route("/tasks").get(taskpage);

// Manager Api
router.get("/managersapi", adminManagers);
router.get("/managersapi/:id", managerDetails);
router.get("/managersapi/search/:searchdata", searchManData)
router.delete("/managersapi/:id", dataDelete)

// Employee Api
router.route("/employeesapi").get(adminEmployees);
router.get("/employeesapi/:id", employeeDetails);
router.get("/employeesapi/search/:searchdata", searchEmpData)
router.delete("/employeesapi/:id", empDataDelete)

// Team
router.route("/team").get(adminTasktrack);

// Task Router
router.route("/tasksData").get(adminTasks);
router.get("/tasksData/:searchdata", searchTasks)
// router.get("/tasksDetails/:id", taskDetail)


// Calender
router.route("/calender").get(adminCalender);


module.exports = router