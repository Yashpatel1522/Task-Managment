const express = require('express')
const router = express.Router();
const multer = require('multer');
const { userProfileStorage } = require("../utility/multer");
const uploadStorageprofile = multer({ storage: userProfileStorage })

const { EmployeeTaskList, list, searchlist, addcomment } = require("../controller/employeemodule/employeetask")
const { teamlist, teamdata, teamdetails, teamsearchdetails } = require("../controller/employeemodule/employeeteam")
const { getdashboardata, dashboard } = require("../controller/employeemodule/dashboard")
const { getProfiledata, updateProfiledata } = require('../controller/employeemodule/employeeprofile');
router.get("/getdashboardata", getdashboardata)
router.get("/dashboard", dashboard)
router.get("/getprofiledata", getProfiledata)
router.post("/updateprofile", uploadStorageprofile.single('profileimg'), updateProfiledata)
router.get('/task/:id', list) //http://127.0.0.1:8000/employee/task/1   
router.get('/employeetasklist/:id', EmployeeTaskList)
router.post('/searchtask', searchlist)
router.post('/addcomment/:id/:taskid', uploadStorageprofile.single('file'), addcomment)
router.get('/teamdata/:id', teamlist)
router.get('/teamdetailsdata/:id', teamdata)
router.get('/teamdetails/:id',teamdetails)
router.get('/teamsearchdetails/:searchteam',teamsearchdetails)




module.exports = router

