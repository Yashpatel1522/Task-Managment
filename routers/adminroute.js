const express = require("express");
const { adminDashboard } = require("../controller/adminmodulo/dashboard");
const { adminManagers } = require("../controller/adminmodulo/managers");
const { adminEmployees } = require("../controller/adminmodulo/employees");
const { adminTasks } = require("../controller/adminmodulo/tasks");
const { adminTasktrack } = require("../controller/adminmodulo/tasktrack");
const { adminCalender } = require("../controller/adminmodulo/calender");
const router = express.Router();

router.route("/dashboard").get(adminDashboard);
router.route("/managers").get(adminManagers);
router.route("/employees").get(adminEmployees);
router.route("/tasks").get(adminTasks);
router.route("/tasktrack").get(adminTasktrack);
router.route("/calender").get(adminCalender);
router.route("/logout").get(adminDashboard);

module.exports = router

