const express = require('express')

const router = express.Router();

const { getdashboardata } = require("../controller/employeemodule/dashboard")

const { EmployeeTaskList } = require("../controller/employeemodulo/employeetasklist")

router.get('/employeetasklist', EmployeeTaskList)

router.get("/getdashboardata", getdashboardata)

router.get("/dashboard", (request, response) => {
    response.render('employeemodule/dashboard')
})

module.exports = router

