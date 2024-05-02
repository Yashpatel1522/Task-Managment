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
const { getUser } = require("../controller/employeemodule/userfetch");
const { messagesGet } = require("../controller/employeemodule/message");
const checkUserRole = require("../middleware/userrole");

// router.get("/teamsearchdetails/:searchteam", teamSearchDetails);
// router.get("/searchtask/:searchresult", searchList);


// router.use(
//   passport.authenticate("jwt", { session: false, failureRedirect: "/" }),
//   checkUserRole
// );

// router.get("/getdashboardata", getDashBoardData);
// router.get("/dashboard", dashBoard);
// router.get("/getUser", getUser);

// router.get("/getprofiledata", getProfileData);
// router.post(
//   "/updateprofile",
//   uploadStorageprofile.single("profileimg"),
//   updateProfileData
// );

// router.get("/getnavigationdata", getNavigationData);
// router.get("/task", list); //http://127.0.0.1:8000/employee/task/1
// router.get("/employeetasklist", employeeTaskList);
// router.post("/addcomment/:id/:taskid", upload.single("file"), addComment);

//team route
// router.get("/teamdata", teamList);
// router.get("/teamdetailsdata", teamData);
// router.get("/teamdetails/:teamid", teamDetails);
// router.get("/calender", employeeCalender);
// router.get("/calenderData/:month", empcalenderMonth);
// router.get(
//   "/dueDateOfTask",

//   empdueDateTask
// );
// router.get("/messages", messageGet);
// router.get("/report", reportGet);
// router.get("/comeletedTasks", completedTasks);

// module.exports = router;
