const express = require("express");
const { loginPost, loginGet } = require("../controller/loginmodule/login.controller");
const { adminDashboard } = require("../controller/adminmodule/dashboard");
const passport = require('passport');
const checkUserRole = require("../middleware/userrole");
const multer = require('multer');
const { acticationGet, acticationPost } = require("../controller/loginmodule/activation.controller");
const { userProfileStorage } = require("../utility/multer");
const { registrationPost } = require("../controller/loginmodule/registration.controller");
const { forgetGet, forgetPost } = require("../controller/loginmodule/forget.controller");
const workingEmployyeInTask = require("../controller/loginmodule/workingemployee.controllers");
const uploadStorage = multer({ storage: userProfileStorage })
// const jwtStrategy=require('passport-jwt').Strategy;
require('../middleware/jwtpassport')
const login = express.Router()

login.get("/", loginGet);
login.post("/", loginPost)

login.post("/registration", uploadStorage.single('img'), registrationPost)

login.get("/newpassword/:activationcode", acticationGet)
login.post("/newpassword/:activationcode", acticationPost)

login.get("/forget",forgetGet)
login.post("/forget",forgetPost)

login.get("/employee/:taskid",workingEmployyeInTask)
login.get("/dashboard",passport.authenticate("jwt",{session:false,failureRedirect:"/login/"}),checkUserRole,adminDashboard)
module.exports=login;
