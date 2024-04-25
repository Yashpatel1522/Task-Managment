const database = require("../helpers/database.helper");
const checkUserRole = async (request, response, next) => {
  if (!isNaN(request.originalUrl.split("/").pop())) {
    let ans = request.originalUrl.split("/");
    ans.pop();
    request.originalUrl = ans.join("/");
  }
  if (request.user != undefined) {
    let user = request.user;
    let db = new database();
    let res = await db.executeQuery(
      "select * from role_has_permissions as table1 left join permissions as table2 on table1.permission_id=table2.id where table1.role_id=? and table1.is_deleted=? and api = ? and type=?",
      [user.role_id, 0, request.originalUrl, request.method.toLowerCase()]
    );
    console.log(request.user);

    console.log(request.originalUrl);
    if (res.length > 0) {
      if (request.originalUrl == res[0].api) {
        next();
      } else {
        if (request.headers.referer != undefined) {
          response.redirect(
            request.headers.referer.split(process.env.PORT).pop()
          );
        } else {
          response.redirect("/");
        }
      }
    } else {
      if (request.headers.referer != undefined) {
        response.redirect(
          request.headers.referer.split(process.env.PORT).pop()
        );
      } else {
        response.redirect("/");
      }
    }
  } else {
    response.redirect("/");
  }
};

module.exports = checkUserRole;
