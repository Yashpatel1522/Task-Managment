const database = require("../../helpers/database.helper");
const logger = require("../../logger/logger");

const workingEmployyeInTask = async (request, response) => {
  try {
    let db = new database();
    response.json(
      await db.executeQuery(
        `select t.*,u.first_name,u.last_name from tasks_assigend_to as t left join users as u on t.emp_id = u.id where task_id = ?;`,
        [request.params.taskid]
      )
    );
  } catch (err) {
    logger.log(err);
  }
};
module.exports = workingEmployyeInTask;
