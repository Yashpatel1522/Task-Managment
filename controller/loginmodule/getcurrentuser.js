const logger = require("../../logger/logger");

exports.getuser = (request, response) => {
  try {
    response.send(request.user);
  } catch (err) {
    logger.log(err);
  }
};
