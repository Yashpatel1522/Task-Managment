
const logger = require("../../logger/logger");

exports.adminTasktrack = (request,response) => {
    try {
        response.render("adminmodulo/tasktrack")
    } catch (err) {
        logger.error(err);
    }
}