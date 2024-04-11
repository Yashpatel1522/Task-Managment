const express = require('express');
const managerTask = require("../controller/managermodulo/managertasks")
const managerroute = express.Router();


managerroute.get("/", (request, response)=> {
    response.render('./managermodule/managerdashboard')
})
managerroute.get("/getManagerTasks", managerTask);

module.exports = managerroute;