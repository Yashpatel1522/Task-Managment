
const logger = require("../../logger/logger");

exports.adminTasks = (request,response) => {
    try {
        response.render("adminmodulo/tasks")
    } catch (err) {
        logger.error(err);
    }
}