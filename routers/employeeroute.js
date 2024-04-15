const express = require('express')
const router = express.Router();

const { getdashboardata, dashboard } = require("../controller/employeemodule/dashboard")

const { EmployeeTaskList,list } = require("../controller/employeemodule/employeetasklist")

router.get('/employeetasklist', EmployeeTaskList)

router.get('/', list)

router.get("/getdashboardata", getdashboardata)
router.get("/dashboard",dashboard)

module.exports = router

