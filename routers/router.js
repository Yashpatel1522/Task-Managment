const passport = require("passport");
const multer = require("multer");
require("../middleware/jwtpassport");

//authentication
const checkUserRole = require("../middleware/userrole");

//login module
const express = require("express");
const { loginPost, loginGet } = require("../controller/loginmodule/login.controller");
const { userProfileStorage } = require("../utility/multer");
const {
  registrationPost,
} = require("../controller/loginmodule/registration.controller");
const {
  acticationGet,
  acticationPost,
} = require("../controller/loginmodule/activation.controller");
const {
  forgetGet,
  forgetPost,
} = require("../controller/loginmodule/forget.controller");
const workingEmployyeInTask = require("../controller/loginmodule/workingemployee.controllers");
const updateTaskDetailsPost = require("../controller/loginmodule/updatetask.controller");
const logout = require("../controller/loginmodule/logout.controller");
const {
  managerTasks,
} = require("../controller/loginmodule/managertasks.controller");
const { getuser } = require("../controller/loginmodule/getcurrentuser");
const { rolePermissionsGet, allPermissionsGet, displaySingleRoleHasPermissions } = require("../controller/loginmodule/rolpermissions");
const { updatePermission } = require("../controller/loginmodule/updatepermissions");
const { roleWiseSearchPermissionsGet } = require("../controller/loginmodule/rolewisesearchpermissions.controller");
const { deletePermissions } = require("../controller/loginmodule/deletepermissions");

//admin
const { socketGet, messageDisplay, socketPost } = require("../controller/adminmodule/socket.io");
const { searchCategory, deleteCategory, categoryDetail, adminCategory, addCategory, categoryPage } = require("../controller/adminmodule/category");
const { searchTasks, taskDetail, adminTasks, taskpage } = require("../controller/adminmodule/tasks");
const { searchTeam, deleteTeam, updateTeamData, teamDetails, teamData, addNewTeam, adminTeam } = require("../controller/adminmodule/teamdata");
const { searchEmpData, empDataDelete, employeeDetails, adminEmployees, employeepage } = require("../controller/adminmodule/employees");
const { searchManData, dataDelete, managerDetails, adminManagers, managerpage } = require("../controller/adminmodule/managers");
const { dueDateTask, calenderMonth, adminCalender } = require("../controller/adminmodule/calender");
const { updateAdminProfile, profiledata } = require("../controller/adminmodule/adminprofile");
const { managerTask, chartsData, adminDashboard } = require("../controller/adminmodule/dashboard");
const { getAllUsers } = require("../controller/adminmodule/getallusers");
const { messagesGet } = require("../controller/adminmodule/messages");
const { checkUserEmail } = require("../controller/adminmodule/checkuseremail");

//multer storage
//registration storage
const uploadStorage = multer({ storage: userProfileStorage });

//admin storage
const updateImage = multer({ storage: userProfileStorage });


//main router
const router = express.Router();

//routers
const login = express.Router();
const adminRouter = express.Router();


//dynemic name to router
router.get("/",loginGet)
router.use("/login",login)
router.use("/admin",adminRouter)



//login routes
login.use(
  passport.authenticate("jwt", { session: false, failureRedirect: "/" })
  );
login.post("/", loginPost);
login.get("/logout", logout);

login.post("/registration", uploadStorage.single("img"), registrationPost);
login.get("/newpassword/:activationcode", acticationGet);
login.post("/newpassword/:activationcode", acticationPost);

login.get("/forget", forgetGet);
login.post("/forget", forgetPost);

//kanban
login.get("/employee/:taskid", workingEmployyeInTask);
login.post("/updateKanban", updateTaskDetailsPost);
// login.get("/managertasks/:id", managerTasks);

login.get("/managertasks", managerTasks);
login.get("/user", getuser);

//rolepermisssions 
login.get("/rolePerissions", rolePermissionsGet);
login.get("/allpermissions", allPermissionsGet);
login.post("/updatepermissions", updatePermission);
login.get("/rolehaspermission/:role", roleWiseSearchPermissionsGet);
login.get("/showpermissions", displaySingleRoleHasPermissions);
login.post("/deletepermissions", deletePermissions);



//admin routers without checkousers 
adminRouter.get(
  "/managersapi/search/:searchdata",
  passport.authenticate("jwt", { session: false, failureRedirect: "/" }),
  searchManData
);

adminRouter.get(
  "/employeesapi/search/:searchdata",
  passport.authenticate("jwt", { session: false, failureRedirect: "/" }),
  searchEmpData
);

adminRouter.get(
  "/teamapi/search/:searchdata",
  passport.authenticate("jwt", { session: false, failureRedirect: "/" }),
  searchTeam
);

adminRouter.get(
  "/tasksData/:searchdata",
  passport.authenticate("jwt", { session: false, failureRedirect: "/" }),
  searchTasks
);

adminRouter.get(
  "/categoryData/:searchdata",
  passport.authenticate("jwt", { session: false, failureRedirect: "/" }),
  searchCategory
);

adminRouter.get(
  "/socket/:email",
  passport.authenticate("jwt", { session: false, failureRedirect: "/" }),
  socketGet
);
//manager without authentication


router.use(
  passport.authenticate("jwt", { session: false, failureRedirect: "/" }),
  checkUserRole
);
//admin with checkusers
//socket
adminRouter.post("/socket", socketPost);
adminRouter.post("/checkuseremail", checkUserEmail);
adminRouter.post("/messagedisplay", messageDisplay);
adminRouter.get("/messages", messagesGet);
adminRouter.get("/allusers", getAllUsers);

// Page Render
adminRouter.route("/dashboard").get(adminDashboard);
adminRouter.route("/managers").get(managerpage);
adminRouter.route("/employees").get(employeepage);
adminRouter.route("/tasks").get(taskpage);
adminRouter.route("/team").get(adminTeam);
adminRouter.route("/category").get(categoryPage);
adminRouter.route("/calender").get(adminCalender);

// Dashboard
adminRouter.get("/profiledata", profiledata);
adminRouter.get("/chartsData", chartsData);
adminRouter.get("/managerTask", managerTask);
adminRouter.post("/profile", updateImage.single("profileimg"), updateAdminProfile);

// Insert Data
adminRouter.post("/newteam", addNewTeam);
adminRouter.post("/category", addCategory);

// Manager Api
adminRouter.get("/managersapi", adminManagers);
adminRouter.get("/managersapi/:id", managerDetails);
adminRouter.delete("/managersapi/:id", dataDelete);

// Employee Api
adminRouter.get("/employeesapi", adminEmployees);
adminRouter.get("/employeesapi/:id", employeeDetails);
adminRouter.delete("/employeesapi/:id", empDataDelete);

// Team
adminRouter.get("/teamapi", teamData);
adminRouter.get("/teamapi/:id", teamDetails);
adminRouter.post("/teamapi/:id", updateTeamData);
adminRouter.delete("/teamapi/:id", deleteTeam);

// Task Router
adminRouter.get("/tasksData", adminTasks);
adminRouter.get("/tasksDetails/:id", taskDetail);

// Category
adminRouter.get("/categoryData", adminCategory);
adminRouter.get("/categoryDetails/:id", categoryDetail);
adminRouter.delete("/categoryData/:id", deleteCategory);

// Calender
adminRouter.get("/calenderData/:month", calenderMonth);
adminRouter.get("/dueDateOfTask", dueDateTask);


//exports main router
module.exports=router