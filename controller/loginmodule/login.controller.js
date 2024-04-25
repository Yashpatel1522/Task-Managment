const database = require("../../helpers/database.helper");
const md5 = require("md5");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const logger = require("../../logger/logger");
const loginGet = (request, response) => {
  response.render("loginmodule/login.ejs");
};

const loginPost = async (request, response) => {
  try {
    let data = request.body;
    let db = new database();
    let result = await db.executeQuery(
      "select id from users where email=? and status=?",
      [data.username, 1]
    );
    console.log(result);
    if (result.length == 0) {
      response.send({
        msg: "invalid Creadentials",
        flag: false,
      });
    }
    if (result.length > 0) {
      let password = await db.executeQuery(
        "select password from user_passwords where user_id=?  order by create_at desc limit 1",
        [result[0].id]
      );
      if (password.length > 0) {
        bcrypt.compare(
          request.body.password,
          password[0].password,
          async (err, res) => {
            if (res == true) {
              var ans = await db.insertData(
                { user_id: result[0].id, is_success: 1 },
                "log_datas"
              );
              let token = jwt.sign(
                { id: result[0].id },
                process.env.SECRET_KEY,
                {
                  expiresIn: "1h",
                }
              );
              let userRole = await db.executeQuery(
                "select roles.role_name from users left join roles on users.role_id=roles.id  where users.id=?",
                [result[0].id]
              );
              console.log(userRole[0].role_name);
              let url;
              switch (userRole[0].role_name) {
                case "employee":
                  url = "/employee/dashboard";
                  break;
                case "admin":
                  url = "/admin/dashboard";
                  break;
                case "manager":
                  url = "/manager/dashboard";
                  break;
                default:
                  url = null;
              }
              console.log(url);
              response
                .cookie("token", token, {
                  maxAge: 1000 * 60 * 60,
                  httpOnly: true,
                })
                .json({ id: result[0].id, flag: true, url: url });
            } else {
              var ans = await db.insertData(
                { user_id: result[0].id },
                "log_datas"
              );
              console.log(result[0]);
              response.send({
                msg: "invalid credentials",
                flag: false,
              });
            }
          }
        );
      } else {
        response.send({
          msg: "invalid credentials",
          flag: false,
        });
      }
    }
  } catch (err) {
    logger.log(err);
  }
};

module.exports = { loginGet, loginPost };
