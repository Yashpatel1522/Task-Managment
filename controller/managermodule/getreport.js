const logger = require("../../logger/logger");

const reportView = (request, response) => {
  try {
    response.render("../views/managermodule/report");
  } catch (error) {
    logger.error(error);
    response.send({ error: error });
  }
};

module.exports = reportView;
