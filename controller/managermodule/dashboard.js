const dashboardView = () => {
  return {
    getPage(request, response) {
      try {
        console.log(request.user.id);
        response.render("../views/managermodule/charts");
      } catch (error) {
        logger.error(error);
        response.send({ error: error });
      }
    },
  };
};

module.exports = dashboardView;
