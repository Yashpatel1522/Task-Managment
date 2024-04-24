const express = require("express");
const router = express.Router();
const multer = require("multer");
const { userProfileStorage ,upload} = require("../utility/multer");
const uploadStorageprofile = multer({ storage: userProfileStorage });

const {
  EmployeeTaskList,
  list,
  searchlist,
  addcomment,
} = require("../controller/employeemodule/employeetask");
const {
  teamlist,
  teamdata,
  teamdetails,
  teamsearchdetails,
} = require("../controller/employeemodule/employeeteam");
const {
  getdashboardata,
  dashboard,
} = require("../controller/employeemodule/dashboard");
const {
  getProfiledata,
  updateProfiledata,
} = require("../controller/employeemodule/employeeprofile");
const passport = require("passport");
router.get("/getdashboardata",passport.authenticate("jwt", { session: false, failureRedirect: "/" }), getdashboardata);
router.get(
  "/dashboard",
  // passport.authenticate("jwt", { session: false, failureRedirect: "/" }),
  dashboard
);
router.get("/getprofiledata",getProfiledata);
router.post(
  "/updateprofile",
  uploadStorageprofile.single("profileimg"),
  updateProfiledata
);
router.get("/task/:id", list); //http://127.0.0.1:8000/employee/task/1
router.get("/employeetasklist/:id", EmployeeTaskList);
router.get("/searchtask/:searchresult", searchlist);
router.post(
  "/addcomment/:id/:taskid",
  upload.single("file"),
  addcomment
);
router.get("/teamdata/:id", teamlist);
router.get("/teamdetailsdata/:id", teamdata);
router.get("/teamdetails/:id", teamdetails);
router.get("/teamsearchdetails/:searchteam", teamsearchdetails);

module.exports = router;
