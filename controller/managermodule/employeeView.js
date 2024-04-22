const employeeView = () => {
  return {
    getPage(request, response) {
      try {
        response.render("../views/managermodule/employee");
      } catch (error) {
        logger.log(error);
        response.send({ error: error });
      }
    },
  };
};

module.exports = employeeView;
