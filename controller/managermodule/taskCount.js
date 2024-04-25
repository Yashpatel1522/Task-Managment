const database = require("../../helpers/database.helper");
const logger = require("../../logger/logger");
let db = new database();

const taskCount = async (request, response) => {
  try {
    let managerId = request.user.id;
    let todoQ = `select count(*) as count from tasks where manager_id = ? and task_status = ?`;
    let progressQ = `select count(*) as count from tasks where manager_id = ? and task_status = ?`;
    let compleatedQ = `select count(*) as count from tasks where manager_id = ? and task_status = ?`;
    let todoRes = await db.executeQuery(todoQ, [managerId, "todo"]);
    let progressRes = await db.executeQuery(progressQ, [
      managerId,
      "inprogress",
    ]);
    let compleatedRes = await db.executeQuery(compleatedQ, [
      managerId,
      "completed",
    ]);
    return response.json({
      todoResult: todoRes,
      progressResult: progressRes,
      compleatedResult: compleatedRes,
    });
  } catch (error) {
    logger.log(error);
    return response.send({ error: error });
  }
};

module.exports = taskCount;
