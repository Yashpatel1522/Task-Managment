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
  notifications
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
  passport.authenticate("jwt", { session: false, failureRedirect: "/" }),
  getDashBoardData
);
router.get(
  "/dashboard",
  passport.authenticate("jwt", { session: false, failureRedirect: "/" }),
  dashBoard
);
router.get(
  "/getUser",
  passport.authenticate("jwt", { session: false, failureRedirect: "/" }),
  getUser
);

router.get(
  "/getprofiledata",
  passport.authenticate("jwt", { session: false, failureRedirect: "/" }),
  getProfileData
);
router.post(
  "/updateprofile",
  passport.authenticate("jwt", { session: false, failureRedirect: "/" }),
  uploadStorageprofile.single("profileimg"),
  updateProfileData
);
// router.use(passport.authenticate("jwt", { session: false, failureRedirect: "/" }))
router.get("/getnavigationdata", passport.authenticate("jwt", { session: false, failureRedirect: "/" }) ,getNavigationData);
router.get("/task", passport.authenticate("jwt", { session: false, failureRedirect: "/" }), list); //http://127.0.0.1:8000/employee/task
router.get("/employeetasklist", passport.authenticate("jwt", { session: false, failureRedirect: "/" }), employeeTaskList);
router.get("/searchtask/:searchresult", passport.authenticate("jwt", { session: false, failureRedirect: "/" }), searchList);
router.post("/addcomment/:id/:taskid", passport.authenticate("jwt", { session: false, failureRedirect: "/" }) ,upload.single("file"), addComment);

//team route
router.get("/teamdata", passport.authenticate("jwt", { session: false, failureRedirect: "/" }), teamList);
router.get("/teamdetailsdata", passport.authenticate("jwt", { session: false, failureRedirect: "/" }), teamData);
router.get("/teamdetails/:teamid", passport.authenticate("jwt", { session: false, failureRedirect: "/" }), teamDetails);
router.get("/teamsearchdetails/:searchteam", passport.authenticate("jwt", { session: false, failureRedirect: "/" }) ,teamSearchDetails);

router.get("/calender", passport.authenticate("jwt", { session: false, failureRedirect: "/" }) ,employeeCalender);
router.get("/calenderData/:month", passport.authenticate("jwt", { session: false, failureRedirect: "/" }), empcalenderMonth);
router.get(
  "/dueDateOfTask",
  passport.authenticate("jwt", { session: false, failureRedirect: "/" }),
  empdueDateTask
);
router.get("/report", passport.authenticate("jwt", { session: false, failureRedirect: "/" }) ,reportGet);
router.get("/comeletedTasks", passport.authenticate("jwt", { session: false, failureRedirect: "/" }), completedTasks);




router.get('/notification', passport.authenticate("jwt", { session: false, failureRedirect: "/" }), notifications)

module.exports = router;
