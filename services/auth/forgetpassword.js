const database = require("../../helpers/database.helper");
const logger = require("../../logger/logger");
const randomNumberGenrater = require("./randomNumberGenrater");

const db = new database();
const forgetpassword = async (username) => {
  try {
    let userexists = await db.executeQuery(
      "select * from users where email=?",
      [username]
    );

    if (typeof userexists == "string") {
      return {
        flag: false,
        msg: "somthing is wrong please restart Application",
      };
    } else if (userexists.length > 0) {
      userexists = userexists[0];
      if (userexists.status == 1) {
        let activationkey = randomNumberGenrater(
          process.env.ACTIVATION_KEY_SIZE
        );
        let registrationdata = {
          role_id: userexists.role_id,
          first_name: userexists.first_name,
          last_name: userexists.last_name,
          email: userexists.email,
          contact: userexists.contact,
          date_of_birth: userexists.date_of_birth,
          employee_role: userexists.employee_role,
          activation_code: activationkey,
        };
        let res = await db.updateAnd(registrationdata, "users", {
          id: userexists.id,
        });
        return {
          msg: "activationkey",
          activationkey: activationkey,
          flag: true,
        };
      } else {
        return {
          flag: false,
          msg: "please Activate Your Account",
        };
      }
    } else {
      return {
        flag: false,
        msg: "User Not Exists",
      };
    }
  } catch (err) {
    logger.log(err);
  }
};

module.exports = forgetpassword;
