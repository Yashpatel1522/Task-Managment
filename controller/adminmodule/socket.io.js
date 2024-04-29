const logger = require("../../logger/logger");
const { insertChat } = require("../../services/socket.io/insertchat");
const { messagedisplay } = require("../../services/socket.io/messgedisplay");
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

exports.messageDisplay = async (request, response) => {
  try {
    let result = await messagedisplay(request.body);
    if (result.flag == true) {
      response.status(200).send(result);
    } else {
      response.status(500).send(result);
    }
  } catch (err) {
    logger.log(err);
  }
};
