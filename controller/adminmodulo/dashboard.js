const logger = require("../../logger/logger");

exports.adminDashboard = (request,response) => {
    try {
        response.render("adminmodulo/dashboard")
    } catch (err) {
        logger.error(err);
    }
}