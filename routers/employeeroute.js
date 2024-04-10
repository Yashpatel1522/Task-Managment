const express = require('express')

const router = express.Router();



const { EmployeeTaskList } = require("../controller/employeemodulo/employeetasklist")

router.get('/', EmployeeTaskList)


module.exports = router