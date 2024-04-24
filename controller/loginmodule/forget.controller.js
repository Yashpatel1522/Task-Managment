const logger = require("../../logger/logger");
const forgetpassword = require("../../services/auth/forgetpassword");
const setNewPassword = require("../../services/auth/setnewpassword");

const forgetGet = (request, response) => {
  response.render("loginmodule/forgetpassword");
};

const forgetPost = async (request, response) => {
  try {
    let res = await forgetpassword(request.body.username);
    console.log(res);
    if (res.flag == true) {
      response.send(res).status(200);
    } else {
      response.send(res).status(500);
    }
  } catch (err) {
    logger.log(err);
  }
};

module.exports = { forgetGet, forgetPost };
