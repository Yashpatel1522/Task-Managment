const express = require('express')
const router = express.Router();
const { EmployeeTaskList, list, searchlist } = require("../controller/employeemodule/employeetasklist")
const { getdashboardata } = require("../controller/employeemodule/dashboard");

router.get('/:id', list) //http://127.0.0.1:8000/employee/3
router.get('/employeetasklist/:id', EmployeeTaskList)
router.post('/searchtask',searchlist)

// const { EmployeeTaskList,list } = require("../controller/employeemodule/employeetasklist")

// router.get('/employeetasklist', EmployeeTaskList)

// router.get('/', list)

router.get("/getdashboardata", getdashboardata)
router.get("/dashboard", (request, response) => {
  response.render('employeemodule/dashboard')
})

module.exports = router

