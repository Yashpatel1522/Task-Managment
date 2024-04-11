const express = require('express');
const managerTask = require("../controller/managermodulo/managertasks")
const managerroute = express.Router();


managerroute.get("/", (request, response)=> {
    response.render('./managermodule/managerdashboard')
})
managerroute.get("/getManagerTasks", managerTask);

module.exports = managerroute;
const { addtaskdata } = require('../controller/managermodule/addtask');
const managerRouter = express.Router();

// api for get user,category from database
managerRouter.get('/getdataapi',addtaskdata);

module.exports = managerRouter;
