const database = require("../../helpers/database.helper");
const logger = require("../../logger/logger");
let db = new database();
const viewComments = async (request, response) => {
  try {
    response.render("../views/managermodule/viewcomments");
  } catch (error) {
    logger.log(error);
    response.send({ error: error });
  }
};

const getComments = async (request, response) => {
  try {
    let teamId = request.params.teamId;
    console.log("hiii");
    query =
      "select user_comments.id,user_comments.task_id,user_comments.employee_id,user_comments.task_status,comment,attechment,users.first_name from user_comments LEFT JOIN users on user_comments.employee_id = users.id where user_comments.task_id = ?";
    let result = await db.executeQuery(query, [teamId]);
    console.log(result);
    return response.json({ result });
  } catch (error) {
    logger.log(error);
  }
};

module.exports = { viewComments, getComments };
