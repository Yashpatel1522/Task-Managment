const express = require('express')

const router = express.Router();
const { getdashboardata } = require("../controller/employeemodule/dashboard")
const { EmployeeTaskList, gettasks, list } = require("../controller/employeemodule/employeetasklist")

router.get('/employeetasklist', EmployeeTaskList)
router.get('/employeetasklist/:id', gettasks)
router.get('/', list)

router.get("/getdashboardata", getdashboardata)
router.get("/dashboard", (request, response) => {
    response.render('employeemodule/dashboard')
})

module.exports = router

