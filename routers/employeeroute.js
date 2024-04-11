const express = require('express')
const { EmployeeTaskList } = require("../controller/employeemodulo/employeetasklist")
const { getdashboardata } = require("../controller/employeemodule/dashboard")
const router = express.Router();

router.get('/', EmployeeTaskList)




router.get("/getdashboardata", getdashboardata)
router.get("/dashboard", (request, response) => {
    response.render('employeemodule/dashboard')
})

module.exports = router

