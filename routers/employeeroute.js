const express = require('express')

const router = express.Router();



const { EmployeeTaskList } = require("../controller/employeemodulo/employeetasklist")

router.get('/', EmployeeTaskList)



const { getdashboardata } = require("../controller/employeemodule/dashboard")

router.get("/getdashboardata", getdashboardata)

router.get("/dashboard", (request, response) => {
    response.render('employeemodule/dashboard')
})

module.exports = router

