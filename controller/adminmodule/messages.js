const logger = require("../../logger/logger");

exports.messagesGet = (request, response) => {
  try {
    response.render("adminmodule/messages")
  } catch {
    logger.log(err)
  }
};
