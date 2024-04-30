const database = require("../../helpers/database.helper");
const logger = require("../../logger/logger");
const db = new database();
const getNavigationData = async (request,response) => {
    try {
      let id = 4
      let res = {}
      res.imagename = await db.executeQuery(
        `select newimage_name from user_profiles where user_id = ? and is_deleted = 0`,[id]
        );
      res.username = await db.executeQuery(
        `select first_name from users where id = ?`,[id]
      );
      return response.json({ result: res });
    } catch (error) {
      logger.error("Dash data is not found !");
    }
  }
module.exports = { getNavigationData };