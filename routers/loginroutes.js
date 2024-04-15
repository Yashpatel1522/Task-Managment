const express=require("express");
const { loginPost, loginGet } = require("../controller/loginmodule/login.controller");
const {adminDashboard } = require("../controller/adminmodulo/dashboard");
const passport=require('passport');
const checkUserRole = require("../middleware/userrole");
// const jwtStrategy=require('passport-jwt').Strategy;
require('../middleware/jwtpassport')
const login=express.Router()

login.get("/",loginGet);
login.post("/",loginPost)


login.get("/dashboard",passport.authenticate("jwt",{session:false,failureRedirect:"/login/"}),checkUserRole,adminDashboard)
module.exports=login;