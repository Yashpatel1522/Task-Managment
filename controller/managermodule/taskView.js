const logger = require("../../logger/logger");

const taskView = () => {
  return {
    getPage(request, response) {
      try {
        response.render("../views/managermodule/managerdashboard");
      } catch (error) {
        logger.error(error);
        response.send({ error: error });
      }
    },
  };
};

module.exports = taskView;
