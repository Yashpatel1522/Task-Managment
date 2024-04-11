const database = require("../../helpers/database.helper");
const logger = require("../../logger/logger");


exports.adminEmployees = async(request,response) => {
    try {
        response.render("adminmodulo/employees")
    } catch (err) {
        logger.error(err);
    }
}