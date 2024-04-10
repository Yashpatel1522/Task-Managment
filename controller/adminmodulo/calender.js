const connection = require("../../config/connection");
const logger = require("../../logger/logger");

exports.admincalender = (request,response) => {
    try {
        response.render("adminmodulo/calender")
    } catch (err) {
        logger.error(err);
    }
}