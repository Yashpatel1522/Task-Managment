const database = require("../../helpers/database.helper");
const logger = require("../../logger/logger");
let db = new database();
const updatePermission = async (request, response) => {
  try {
    let res = await db.executeQuery("select id from roles where role_name=?", [
      request.body.roleName,
    ]);
    console.log(res);
    const role_id = res[0].id;
    request.body.permissions = Array.isArray(request.body.permissions)
      ? request.body.permissions
      : [request.body.permissions];
    if (request.body.permissions != undefined) {
      request.body.permissions.forEach(async (permission) => {
        res = await db.updateAnd({ is_deleted: 0 }, "role_has_permissions", {
          role_id: role_id,
          permission_id: permission,
        });
        if (res.affectedRows == 0) {
          res = await db.insertData(
            { role_id: role_id, permission_id: permission },
            "role_has_permissions"
          );
        }
      });
      response.status(200).send({
        flag: true,
        message: "permissions added",
      });
    } else {
      response.status(500).send({
        flag: false,
        message: "permissions is Empty",
      });
    }
  } catch (err) {
    response.status(500).send({
      flag: false,
      message: "permissions not added",
    });
    logger.error(err);
  }
};
module.exports = { updatePermission };
