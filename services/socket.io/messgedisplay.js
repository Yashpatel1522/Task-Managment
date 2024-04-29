const database = require("../../helpers/database.helper");
const logger = require("../../logger/logger");
const db = new database();

exports.messagedisplay = async (data) => {
  try {
    console.log(data);
    let res = await db.executeQuery(
      "select * from chats where sender_id=? or reciver_id=? ORDER BY create_at asc",
      [data.sender_id, data.sender_id]
    );
    if (res.length > 0) {
      return {
        flag: true,
        data: res,
      };
    } else {
      return {
        flag: false,
        msg: "Data Is Empty",
      };
    }
  } catch (err) {
    logger.info(err);
  }
};
