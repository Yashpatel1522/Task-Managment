const express = require("express");
const { admindashboard } = require("../controller/adminmodulo/dashboard");
const { adminemployees } = require("../controller/adminmodulo/employees");
const { adminManagers } = require("../controller/adminmodulo/managers");
const { admintasks } = require("../controller/adminmodulo/tasks");
const { admintasktrack } = require("../controller/adminmodulo/tasktrack");
const { admincalender } = require("../controller/adminmodulo/calender");
const admin = express.Router();

admin.route("/dashboard").get(admindashboard);
admin.route("/managers").get(adminManagers);
admin.route("/employees").get(adminemployees);
admin.route("/tasks").get(admintasks);
admin.route("/tasktrack").get(admintasktrack);
admin.route("/calender").get(admincalender);
admin.route("/logout").get(admindashboard);

module.exports = admin

