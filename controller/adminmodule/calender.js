const logger = require("../../logger/logger")

exports.adminCalender = (request, response) => {
    try {
        response.render("adminmodule/calender")
    } catch (err) {
        logger.error("Calendar not found it!");
    }
}