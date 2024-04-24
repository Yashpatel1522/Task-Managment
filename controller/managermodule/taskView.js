const database = require("../../helpers/database.helper");
const logger = require("../../logger/logger");
const taskView = () => {
  return {
    getPage(request, response) {
      try {
        // console.log(request.user.id);
        response.render("../views/managermodule/managerdashboard", {
          // id: request.user.id,
        });
      } catch (error) {
        logger.error(error);
      }
    },
  };
};

module.exports = taskView;
