const database = require("../../helpers/database.helper");
const logger = require("../../logger/logger");

exports.getAllUsers = async (request, response) => {
  let db = new database();
  try {
    response.send(
      await db.executeQuery("select * from users where status=?", [1])
    );
  } catch (err) {
    logger.log(err);
  }
};
