const database = require("../../helpers/database.helper");
const logger = require("../../logger/logger");
var db = new database();

exports.profiledata = async (request, response) => {
  try {
    let imageadmin = await db.executeQuery(
      `select newimage_name from user_profiles where user_id = ? and is_deleted = ?`,
      [1, 0]
    );
    let res = await db.executeQuery(
      `select * from users as u inner join roles as r on u.role_id = r.id where r.role_name = ?`,
      ["Admin"]
    );
    return response.json({ imageadmin: imageadmin, result: res });
  } catch (error) {
    logger.error("Data is not found !");
  }
};

exports.updateAdminProfile = async (request, response) => {
  try {
    let user_id = request.body.id
    if (request.file) {
      let { originalname, filename } = request.file;
      await db.updateAnd({ is_deleted: 1 }, 'user_profiles', { user_id: user_id, is_deleted: 0 })
      await db.insertData(
        { user_id: user_id, oldimage_name: originalname, newimage_name: filename },
        "user_profiles"
      );
    }
    await db.updateAnd(request.body, "users", { id: user_id });
    return response.json({ status: 200, message: "admin profile update succefully" });
  } catch (error) {
    logger.error("Not Update Admin Profile!");
    return response.json({ status: 500, message: "Email is already exixts !" });
  }
};
