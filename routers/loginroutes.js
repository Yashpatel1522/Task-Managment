const express = require("express");
const {
  loginPost,
  loginGet,
} = require("../controller/loginmodule/login.controller");
const { adminDashboard } = require("../controller/adminmodule/dashboard");
const passport = require("passport");
const checkUserRole = require("../middleware/userrole");
const multer = require("multer");
const {
  acticationGet,
  acticationPost,
} = require("../controller/loginmodule/activation.controller");
const { userProfileStorage } = require("../utility/multer");
const {
  registrationPost,
} = require("../controller/loginmodule/registration.controller");
const {
  forgetGet,
  forgetPost,
} = require("../controller/loginmodule/forget.controller");
const workingEmployyeInTask = require("../controller/loginmodule/workingemployee.controllers");
const updateTaskDetailsPost = require("../controller/loginmodule/updatetask.controller");
const {
  managerTasks,
} = require("../controller/loginmodule/managertasks.controller");
const logout = require("../controller/loginmodule/logout.controller");
const uploadStorage = multer({ storage: userProfileStorage });
// const jwtStrategy=require('passport-jwt').Strategy;
require("../middleware/jwtpassport");
const login = express.Router();

// login.get("/", loginGet);
login.post("/", loginPost);

login.post("/registration", uploadStorage.single("img"), registrationPost);

login.get("/newpassword/:activationcode", acticationGet);
login.post("/newpassword/:activationcode", acticationPost);

login.get("/forget", forgetGet);
login.post("/forget", forgetPost);

login.get("/employee/:taskid", workingEmployyeInTask);

login.post("/updateKanban", updateTaskDetailsPost);

login.get(
  "/managertasks/:id",
  passport.authenticate("jwt", { session: false, failureRedirect: "/" }),
  managerTasks
);

login.get("/logout", logout);

login.get(
  "/managertasks",
  passport.authenticate("jwt", { session: false, failureRedirect: "/" }),
  managerTasks
);

// login.get(
//   "/dashboard",
//   passport.authenticate("jwt", { session: false, failureRedirect: "/" }),
//   checkUserRole,
//   adminDashboard
// );
module.exports = login;
