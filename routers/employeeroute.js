const express = require("express");
const router = express.Router();
const multer = require("multer");
const { userProfileStorage, upload } = require("../utility/multer");
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
const {
  employeeCalender,
  empdueDateTask,
  empcalenderMonth,
} = require("../controller/employeemodule/canlender");
const {
  getnavigationdata,
} = require("../controller/employeemodule/navigation");
const { reportGet, completedTasks } = require("../controller/employeemodule/reports");
router.get(
  "/getdashboardata/:id?",
  // passport.authenticate("jwt", { session: false, failureRedirect: "/" }),
  getdashboardata
);
router.get(
  "/dashboard",
  // passport.authenticate("jwt", { session: false, failureRedirect: "/" }),
  dashboard
);
router.get(
  "/getprofiledata",
  // passport.authenticate("jwt", { session: false, failureRedirect: "/" }),
  getProfiledata
);
router.post(
  "/updateprofile",
  uploadStorageprofile.single("profileimg"),
  // passport.authenticate("jwt", { session: false, failureRedirect: "/" }),
  updateProfiledata
);
router.get("/getnavigationdata", getnavigationdata);
router.get("/task/:id", list); //http://127.0.0.1:8000/employee/task/1
router.get("/employeetasklist/:id", EmployeeTaskList);
router.get("/searchtask/:searchresult", searchlist);
router.post("/addcomment/:id/:taskid", upload.single("file"), addcomment);


//team route
router.get("/teamdata", teamlist);
router.get("/teamdetailsdata", teamdata);
router.get("/teamdetails/:teamid", teamdetails);
router.get("/teamsearchdetails/:searchteam", teamsearchdetails);

router.get("/calender", employeeCalender);
router.get("/calenderData/:month", empcalenderMonth);
router.get(
  "/dueDateOfTask",
  passport.authenticate("jwt", { session: false, failureRedirect: "/" }),
  empdueDateTask
);
router.get("/report", reportGet);
router.get("/comeletedTasks",completedTasks)

module.exports = router;
