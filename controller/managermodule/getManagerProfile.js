const database = require("../../helpers/database.helper");
const logger = require("../../logger/logger");

const managerProfile = async (request, response) => {
  try {
    let q = `select * from users where id = ? and status = 1;`;
    let db = new database();
    let res = await db.executeQuery(q, [request.params.id]);
    const imageQuery = `select newimage_name from user_profiles where user_id = ?;`;
    const imageRes = await db.executeQuery(imageQuery, [request.params.id]);
    return response.json({ result: res, imageResult: imageRes });
  } catch (error) {
    logger.log(error);
    return response.send({ error: error });
  }
};

module.exports = managerProfile;
