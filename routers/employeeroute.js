const express = require('express')
const router = express.Router();
const { EmployeeTaskList, list, searchlist } = require("../controller/employeemodule/employeetasklist")
const { getdashboardata, dashboard } = require("../controller/employeemodule/dashboard")
const { getProfiledata } = require('../controller/employeemodule/employeeprofile');
const { EmployeeTaskList,  list } = require("../controller/employeemodule/employeetasklist");

router.get("/getdashboardata", getdashboardata)
router.get("/dashboard",dashboard)
router.get("/getprofiledata",getProfiledata)
router.get('/:id', list) //http://127.0.0.1:8000/employee/3
router.get('/employeetasklist/:id', EmployeeTaskList)
router.post('/searchtask',searchlist)

// const { EmployeeTaskList,list } = require("../controller/employeemodule/employeetasklist")

router.get('/employeetasklist', EmployeeTaskList)
router.get('/', list)



module.exports = router

