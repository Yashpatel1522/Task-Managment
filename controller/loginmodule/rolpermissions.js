const logger = require("../../logger/logger");

const rolePermissionsGet = (request, response) => {
  try {
    response.render("loginmodule/rolepermissions");
  } catch (err) {
    logger.log(err);
  }
};

module.exports={rolePermissionsGet}