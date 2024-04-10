const express = require("express");
const { admindashboard } = require("../controller/adminmodulo/dashboard");
const { adminemployees } = require("../controller/adminmodulo/employees");
const { adminmanagers } = require("../controller/adminmodulo/managers");
const { admintasks } = require("../controller/adminmodulo/tasks");
const { admintasktrack } = require("../controller/adminmodulo/tasktrack");
const { admincalender } = require("../controller/adminmodulo/calender");
const router = express.Router();

router.route("/dashboard").get(admindashboard);
router.route("/managers").get(adminemployees);
router.route("/employees").get(adminmanagers);
router.route("/tasks").get(admintasks);
router.route("/tasktrack").get(admintasktrack);
router.route("/calender").get(admincalender);
router.route("/logout").get(admindashboard);

module.exports = router

