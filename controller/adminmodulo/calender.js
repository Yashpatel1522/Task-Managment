const logger = require("../../logger/logger")

exports.adminCalender = (request,response) => {
    try {
        response.render("adminmodulo/calender")
    } catch (err) {
        logger.error(err);
    }
}