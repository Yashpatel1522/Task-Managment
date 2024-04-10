
const logger = require("../../logger/logger");

exports.admintasktrack = (request,response) => {
    try {
        response.render("adminmodulo/tasktrack")
    } catch (err) {
        logger.error(err);
    }
}