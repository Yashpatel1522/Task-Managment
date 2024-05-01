const logger = require("../../logger/logger");

exports.messagesGet = (request, response) => {
  try {
    response.render("employeemodule/message");
  } catch (err) {
    logger.log(err);
  }
};
