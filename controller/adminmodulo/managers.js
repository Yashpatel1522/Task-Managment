const connection = require("../../config/connection");
const logger = require("../../logger/logger");

exports.adminmanagers = (request,response) => {
    try {
        response.render("adminmodulo/managers")
    } catch (err) {
        logger.error(err);
    }
}