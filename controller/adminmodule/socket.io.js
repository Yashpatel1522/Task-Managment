const database = require("../../helpers/database.helper");
const logger = require("../../logger/logger");
const { insertChat } = require("../../services/socket.io/insertchat");
exports.socketGet = (request, response) => {
  try {
    response.render("adminmodule/socket.io.ejs");
  } catch (err) {
    logger.log(err);
  }
};

exports.socketPost = async (request, response) => {
  try {
    let res = await insertChat(request.body);
    if (res.flag == true) {
      response.status(200).send(res);
    } else {
      response.status(500).send(res);
    }
  } catch (err) {
    logger.info(err);
  }
};
