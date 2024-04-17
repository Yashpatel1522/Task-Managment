const express=require("express");
const { loginPost, loginGet } = require("../controller/loginmodule/login.controller");
const {adminDashboard } = require("../controller/adminmodulo/dashboard");
const passport=require('passport');
const checkUserRole = require("../middleware/userrole");
const { registrationPost } = require("../controller/loginmodule/registration.controller");
const multer = require('multer'); 
const {userProfileStorage} = require("../utility/multer");
const acticationGet = require("../controller/loginmodule/activation.controller");
const uploadStorage = multer({ storage: userProfileStorage })
// const jwtStrategy=require('passport-jwt').Strategy;
require('../middleware/jwtpassport')
const login=express.Router()

login.get("/",loginGet);
login.post("/",loginPost)

login.post("/registration",uploadStorage.single('img'),registrationPost)

login.get("/newpassword/:activationcode",acticationGet)

login.get("/dashboard",passport.authenticate("jwt",{session:false,failureRedirect:"/login/"}),checkUserRole,adminDashboard)
module.exports=login;