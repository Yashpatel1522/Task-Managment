const database = require("../../helpers/database.helper");
const logger = require("../../logger/logger");

const managerProfile = async (request, response) => {
  try {
    let managerId = request.user.id;
    let q = `select * from users where id = ? and status = 1;`;
    let db = new database();
    let res = await db.executeQuery(q, [managerId]);
    const imageQuery = `select newimage_name from user_profiles where user_id = ?;`;
    const imageRes = await db.executeQuery(imageQuery, [managerId]);
    return response.json({ result: res, imageResult: imageRes });
  } catch (error) {
    logger.error(error);
    return response.send({ error: error });
  }
};

module.exports = managerProfile;
