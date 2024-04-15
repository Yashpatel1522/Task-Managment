const express = require('express')
const router = express.Router();

const { getdashboardata, dashboard } = require("../controller/employeemodule/dashboard")
const { getProfiledata } = require('../controller/employeemodule/employeeprofile');

const { EmployeeTaskList,  list } = require("../controller/employeemodule/employeetasklist");

router.get('/employeetasklist', EmployeeTaskList)
// router.get('/employeetasklist/:id', gettasks)
router.get('/', list)

router.get("/getdashboardata", getdashboardata)
router.get("/dashboard",dashboard)
router.get("/getprofiledata",getProfiledata)

module.exports = router

