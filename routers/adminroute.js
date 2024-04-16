const express = require("express");
const { adminDashboard } = require("../controller/adminmodulo/dashboard");
const { adminManagers, managerDetails, searchManData, dataDelete } = require("../controller/adminmodulo/managers");
const { adminEmployees, employeeDetails, searchEmpData, empDataDelete } = require("../controller/adminmodulo/employees");
const { adminTasks,searchTasks } = require("../controller/adminmodulo/tasks");
const { adminTasktrack } = require("../controller/adminmodulo/tasktrack");
const { adminCalender } = require("../controller/adminmodulo/calender");
const router = express.Router();

router.route("/dashboard").get(adminDashboard);
//
router.get("/managers", (request, response)=> {
  response.render('./adminmodulo/managers')
});

router.get("/employees", (request, response)=> {
  response.render('./adminmodulo/employees')
})

router.get("/tasks", (request, response)=> {
  response.render('./adminmodulo/tasks')
})


router.get("/managersapi", adminManagers);
router.get("/managersapi/:id", managerDetails);
router.get("/managersapi/search/:searchdata", searchManData)
router.delete("/managersapi/:id", dataDelete)

router.route("/employeesapi").get(adminEmployees);
router.get("/employeesapi/:id", employeeDetails);
router.get("/employeesapi/search/:searchdata", searchEmpData)
router.delete("/employeesapi/:id", empDataDelete)

router.route("/tasksData").get(adminTasks);
router.get("/tasksData/:searchdata", searchTasks)

router.route("/tasktrack").get(adminTasktrack);
router.route("/calender").get(adminCalender);
router.route("/logout").get(adminDashboard);

module.exports = router

