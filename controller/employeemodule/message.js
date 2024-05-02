const logger = require("../../logger/logger");

exports.messageGet = (request, response) => {
  try {
    response.render("employeemodule/message");
  } catch (err) {
    logger.log(err);
  }
};
