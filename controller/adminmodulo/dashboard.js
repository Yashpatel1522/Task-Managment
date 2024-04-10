const logger = require("../../logger/logger");

exports.admindashboard = (request,response) => {
    try {
        response.render("adminmodulo/dashboard")
    } catch (err) {
        logger.error(err);
    }
}