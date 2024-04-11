const express = require('express');
const managerTask = require("../controller/managermodulo/managertasks")
const managerroute = express.Router();

managerroute.get("/getManagerTasks", managerTask);

module.exports = managerroute;
