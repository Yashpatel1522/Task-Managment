const database = require("../../helpers/database.helper");
let db = new database();

const roleWiseSearchPermissionsGet = async (request, response) => {
  let res = await db.executeQuery("select id from roles where role_name=?", [
    request.params.role,
  ]);
  const role_id = res[0].id;

  response.send(
    await db.executeQuery(
      "select * from permissions as p left join role_has_permissions as rhp on p.id=rhp.permission_id where rhp.role_id=?",
      [role_id]
    )
  );
};
module.exports = { roleWiseSearchPermissionsGet };
