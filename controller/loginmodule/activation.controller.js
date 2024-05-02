const { Logger } = require("winston");
const setNewPassword = require("../../services/auth/setnewpassword");
const logger = require("../../logger/logger");

const acticationGet = (request, response) => {
  response.render("loginmodule/setnewpassword");
};

const acticationPost = async (request, response) => {
  try {
    let activationcode = request.params.activationcode;
    let res = await setNewPassword(activationcode, request.body.new_password);
    if (res.flag == false) {
      response.send(res).status(200);
    } else {
      response.send(res).status(500);
    }
  } catch (err) {
    logger.log(err);
  }
};
module.exports = { acticationGet, acticationPost };
