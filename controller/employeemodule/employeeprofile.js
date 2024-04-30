const database = require("../../helpers/database.helper");
const logger = require("../../logger/logger");
const db = new database();

const getProfiledata = async (request, response) => {
  try {
    let profledata = {};
    let id = request.user.id;
    profledata.imagename = await db.executeQuery(
      `select newimage_name from user_profiles where user_id = ? and is_deleted = 0`, [id]
    );
    profledata.userdata = await db.executeQuery(`select * from users where id=?`, [id]);
    return response.json({
      result: profledata,
    });
  } catch (error) {
    logger.error("profile data is not found !");
  }
};
const updateProfiledata = async (request, response) => {
  try {
    // let userid = request.user.id
    let userid = request.user.id;
    if (request.file) {
      let { originalname, filename } = request.file;
      await db.updateAnd({ is_deleted: 1 }, 'user_profiles', { user_id: userid, is_deleted: 0 })
      await db.insertData(
        { user_id: userid, oldimage_name: originalname, newimage_name: filename },
        "user_profiles"
      );
    }
    await db.updateAnd(request.body, "users", { id: userid });
    return response.status(200).json({
      'message': 'updated'
    });
  } catch (error) {
    logger.error("profile is not updated!!");
  }
};
module.exports = { getProfiledata, updateProfiledata };
