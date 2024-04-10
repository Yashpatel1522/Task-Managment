const express = require("express");

const router = express.Router();

const { getdashboardata } = require("../controller/employeemodule/dashboard")

router.get("/getdashboardata",getdashboardata)

router.get("/dashboard",(request,response) => {
    response.render('employeemodule/dashboard')
})

module.exports = router

