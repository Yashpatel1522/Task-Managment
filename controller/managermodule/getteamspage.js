const logger = require("../../logger/logger");

exports.teamsGet = (request, response) => {
  try {
    response.render("./managermodule/teams");
  } catch (err) {
    logger.log(err);
  }
};
