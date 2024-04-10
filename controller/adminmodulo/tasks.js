
const logger = require("../../logger/logger");

exports.admintasks = (request,response) => {
    try {
        response.render("adminmodulo/tasks")
    } catch (err) {
        logger.error(err);
    }
}