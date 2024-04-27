const database = require("../../helpers/database.helper");
let db = new database();

const ropleWiseSearchPermissionsGet = async (request, response) => {
  let res = await db.executeQuery("select id from roles where role_name=?", [
    request.params.role,
  ]);
  const role_id = res[0].id;

  response.send(
    await db.executeQuery(
      "select * from role_has_permissions where role_id=?",
      [role_id]
    )
  );
};
module.exports = { ropleWiseSearchPermissionsGet };
