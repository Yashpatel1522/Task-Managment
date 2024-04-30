const database = require("../../helpers/database.helper");

let db = new database();
exports.checkUserEmail = async (request, response) => {
  let res = await db.executeQuery("select * from users where email=?", [
    request.body.email,
  ]);
  if (res.length > 0) {
    response.send({
      flag: true,
      msg: res[0].id,
    });
  } else {
    response.send({
      flag: false,
      msg: "",
    });
  }
};
