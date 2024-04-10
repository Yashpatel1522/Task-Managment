const express=require("express")
const loginGet = require("../controller/loginmodule/login.controller")

const login=express.Router()

login.get("/login",loginGet);

module.exports=login;