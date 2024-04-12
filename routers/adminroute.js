const express = require("express");
const { adminDashboard } = require("../controller/adminmodulo/dashboard");
const { adminManagers, managerDetails } = require("../controller/adminmodulo/managers");
const { adminEmployees, employeeDetails } = require("../controller/adminmodulo/employees");
const { adminTasks } = require("../controller/adminmodulo/tasks");
const { adminTasktrack } = require("../controller/adminmodulo/tasktrack");
const { adminCalender } = require("../controller/adminmodulo/calender");
const router = express.Router();

//
router.get("/managers", (request, response)=> {
  response.render('./adminmodulo/managers')
});

router.get("/employees", (request, response)=> {
  response.render('./adminmodulo/employees')
})

router.route("/dashboard").get(adminDashboard);

router.get("/managersapi", adminManagers);
router.get("/managersapi/:id", managerDetails);

router.route("/employeesapi").get(adminEmployees);
router.get("/employeesapi/:id", employeeDetails);

router.route("/tasks").get(adminTasks);
router.route("/tasktrack").get(adminTasktrack);
router.route("/calender").get(adminCalender);
router.route("/logout").get(adminDashboard);

module.exports = router

