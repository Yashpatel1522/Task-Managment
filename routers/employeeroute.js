const express = require('express')

const router = express.Router();



const { EmployeeTaskList } = require("../controller/employeemodule/employeetasklist")

router.get('/employeetasklist', EmployeeTaskList)



const { getdashboardata } = require("../controller/employeemodule/dashboard")

router.get("/getdashboardata", getdashboardata)

router.get("/dashboard", (request, response) => {
    response.render('employeemodule/dashboard')
})

module.exports = router

