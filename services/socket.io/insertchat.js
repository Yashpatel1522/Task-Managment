const database = require("../../helpers/database.helper");
const logger = require("../../logger/logger");
const db = new database();
exports.insertChat = async (data) => {
  try {
    let res = await db.insertData(data, "chats");
    if (res.affectedRows == 1) {
      return {
        flag: true,
        msg: "data is inserted",
      };
    } else {
      return {
        flag: false,
        msg: "Data Is Not Insert",
      };
    }
  } catch (err) {
    logger.info(err);
  }
};
