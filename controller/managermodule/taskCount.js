const database = require("../../helpers/database.helper");
const logger = require("../../logger/logger");
let db = new database();

const taskCount = async (request, response) => {
  try {
    let todoQ = `select count(*) as count from tasks where manager_id = 1 and task_status = 'todo';`;
    let progressQ = `select count(*) as count from tasks where manager_id = 1 and task_status = 'inprogress';`;
    let compleatedQ = `select count(*) as count from tasks where manager_id = 1 and task_status = 'completed';`;
    let todoRes = await db.executeQuery(todoQ);
    let progressRes = await db.executeQuery(progressQ);
    let compleatedRes = await db.executeQuery(compleatedQ);
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
