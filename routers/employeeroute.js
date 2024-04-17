const express = require('express')
const router = express.Router();
const multer = require('multer');
// const userProfileStorage = require("../utility/multer");
// const uploadStorage = multer({ storage: userProfileStorage })
const { EmployeeTaskList, list, searchlist, addcomment } = require("../controller/employeemodule/employeetasklist")
const { getdashboardata, dashboard } = require("../controller/employeemodule/dashboard")
const { getProfiledata,updateProfiledata } = require('../controller/employeemodule/employeeprofile');
// const multer = require('multer');

const {userProfileStorage} = require('../utility/multer');
const upload = multer({storage: userProfileStorage})

router.get("/getdashboardata", getdashboardata)
router.get("/dashboard",dashboard)
router.get("/getprofiledata",getProfiledata)
router.post("/updateprofile",upload.single('profileimg'),updateProfiledata)
router.get('/:id', list) //http://127.0.0.1:8000/employee/3
router.get('/employeetasklist/:id', EmployeeTaskList)
router.post('/searchtask', searchlist)
router.post('/addcomment/:id', upload.single('img'), addcomment)


// const { EmployeeTaskList,list } = require("../controller/employeemodule/employeetasklist")


module.exports = router

