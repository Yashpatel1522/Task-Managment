const express = require("express");
const router = express.Router();
const multer = require("multer");
const { userProfileStorage, upload } = require("../utility/multer");
const uploadStorageprofile = multer({ storage: userProfileStorage });

const {
  employeeTaskList,
  list,
  searchList,
  addComment,
} = require("../controller/employeemodule/employeetask");
const {
  teamList,
  teamData,
  teamDetails,
  teamSearchDetails,
} = require("../controller/employeemodule/employeeteam");
const {
  getDashBoardData,
  dashBoard,
} = require("../controller/employeemodule/dashboard");
const {
  getProfileData,
  updateProfileData,
} = require("../controller/employeemodule/employeeprofile");
const passport = require("passport");
const {
  employeeCalender,
  empdueDateTask,
  empcalenderMonth,
} = require("../controller/employeemodule/canlender");
const {
  getNavigationData,
} = require("../controller/employeemodule/navigation");
const {
  reportGet,
  completedTasks,
} = require("../controller/employeemodule/reports");
const { route } = require("./managerroute");
const { getUser } = require("../controller/employeemodule/userfetch");
router.get(
  "/getdashboardata/:id?",
  // passport.authenticate("jwt", { session: false, failureRedirect: "/" }),
  getDashBoardData
);
router.get(
  "/dashboard",
  passport.authenticate("jwt", { session: false, failureRedirect: "/" }),
  dashboard
);
router.get(
  "/getUser",
  passport.authenticate("jwt", { session: false, failureRedirect: "/" }),
  getUser
);

router.get(
  "/getprofiledata",
  // passport.authenticate("jwt", { session: false, failureRedirect: "/" }),
  getProfileData
);
router.post(
  "/updateprofile",
  uploadStorageprofile.single("profileimg"),
  // passport.authenticate("jwt", { session: false, failureRedirect: "/" }),
  updateProfileData
);
// router.use(passport.authenticate("jwt", { session: false, failureRedirect: "/" }))
router.get("/getnavigationdata", getNavigationData);
router.get("/task/:id", list); //http://127.0.0.1:8000/employee/task/1
router.get("/employeetasklist/:id", employeeTaskList);
router.get("/searchtask/:searchresult", searchList);
router.post("/addcomment/:id/:taskid", upload.single("file"), addComment);

//team route
router.get("/teamdata", teamList);
router.get("/teamdetailsdata", teamData);
router.get("/teamdetails/:teamid", teamDetails);
router.get("/teamsearchdetails/:searchteam", teamSearchDetails);

router.get("/calender", employeeCalender);
router.get("/calenderData/:month", empcalenderMonth);
router.get(
  "/dueDateOfTask",
  passport.authenticate("jwt", { session: false, failureRedirect: "/" }),
  empdueDateTask
);
router.get("/report", reportGet);
router.get("/comeletedTasks", completedTasks);

module.exports = router;
