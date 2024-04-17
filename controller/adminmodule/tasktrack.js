
const logger = require("../../logger/logger");

exports.adminTasktrack = (request, response) => {
    try {
        response.render("adminmodule/tasktrack")
    } catch (err) {
        logger.error("Team data not found!");
    }
}