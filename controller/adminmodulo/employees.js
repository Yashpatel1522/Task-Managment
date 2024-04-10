const logger = require("../../logger/logger");

exports.adminemployees = (request,response) => {
    try {
        response.render("adminmodulo/employees")
    } catch (err) {
        logger.error(err);
    }
}