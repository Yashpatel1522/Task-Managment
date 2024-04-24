const logger = require("../../logger/logger");

const dashboardView = (request, response) => {
  try {
    response.render("../views/managermodule/charts");
  } catch (error) {
    logger.error(error);
    response.send({ error: error });
  }
};

module.exports = dashboardView;
