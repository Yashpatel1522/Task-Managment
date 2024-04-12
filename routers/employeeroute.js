const express = require('express')
const router = express.Router();

const { getdashboardata, dashboard } = require("../controller/employeemodule/dashboard")

const { EmployeeTaskList, gettasks, list } = require("../controller/employeemodule/employeetasklist")

router.get('/employeetasklist', EmployeeTaskList)
router.get('/employeetasklist/:id', gettasks)
router.get('/', list)

router.get("/getdashboardata", getdashboardata)
router.get("/dashboard",dashboard)

module.exports = router

