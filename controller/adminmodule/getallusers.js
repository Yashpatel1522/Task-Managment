const database = require("../../helpers/database.helper");
const logger = require("../../logger/logger");

exports.getAllUsers = async (request, response) => {
  let db = new database();
  try {
    let res = [];
    let users =
      await db.executeQuery(`select up.user_id,up.newimage_name,us.first_name,us.last_name,us.role_id from users as us left join user_profiles as up on
        us.id=up.user_id where us.status=1 order by up.create_at desc`);

    for (let j = 0; j < users.length; j++) {
      let user = users[j];
      let flag = 0;
      for (let i = 0; i < res.length; i++) {
        if (res[i].user_id == user.user_id) {
          flag = 1;
        }
      }
      if (flag == 0) {
        res.push(user);
      }
    }
    response.send(res);
  } catch (err) {
    logger.log(err);
  }
};
