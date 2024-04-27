const database = require("../../helpers/database.helper");
const logger = require("../../logger/logger");
let db = new database();
const deletePermissions = async (request, response) => {
  try {
    if (request.body.rolePermissionId != undefined) {
      let ans = await db.executeQuery(
        "select * from role_has_permissions where id=?",
        [request.body.rolePermissionId]
      );
      let msg;
      if (ans.length > 0) {
        if (ans[0].is_deleted == 0) {
          ans[0].is_deleted = 1;
          msg = "permission removed";
        } else {
          ans[0].is_deleted = 0;
          msg = "permission added";
        }
        ans = await db.updateAnd(
          { is_deleted: ans[0].is_deleted },
          "role_has_permissions",
          { id: ans[0].id }
        );
        response.status(200).send({
          flag: true,
          message: msg,
        });
      } else {
        response.status(500).send({
          flag: false,
          message: "permissions not added",
        });
      }
    }
  } catch (err) {
    response.status(500).send({
      flag: false,
      message: "permissions not added",
    });
    logger.error(err);
  }
};
module.exports = { deletePermissions };
