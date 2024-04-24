const dashboardView = (request,response) => {
      try {
        response.render("../views/managermodule/charts");
      } catch (error) {
        logger.log(error);
        response.send({ error: error });
      }
};

module.exports = dashboardView;
