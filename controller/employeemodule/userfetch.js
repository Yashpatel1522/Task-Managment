const logger = require("../../logger/logger");
const getUser = async (request, response) => {
  try {
    // let userid = request.user.id
    let user = request.user;
    console.log(user, "asfas");
    return response.status(200).json({
      user: user,
    });
  } catch (error) {
    logger.error("profile is not updated!!");
  }
};

module.exports = { getUser };
