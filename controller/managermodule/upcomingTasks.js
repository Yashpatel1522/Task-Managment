const database = require("../../helpers/database.helper");
const logger = require("../../logger/logger");
let db = new database();
const upcomingTasks = async (request, response) => {
  try {
    let managerId = request.user.id;
    const currentDate = new Date();
    let nextDate = new Date();
    nextDate.setDate(currentDate.getDate() + 7);
    const fromDate = currentDate.toISOString().slice(0, 10);
    const toDate = nextDate.toISOString().slice(0, 10);
    let q = `select * from tasks where task_end_date between ? and ? and manager_id = ? and task_status != 'compleated' and status = 1;`;
    let res = await db.executeQuery(q, [fromDate, toDate, managerId]);

    let teamQ = `select * from teams where is_active = ?;`;
    let teamRes = await db.executeQuery(teamQ, [1]);

    return response.json({ result: res, teamResult: teamRes });
  } catch (error) {
    logger.error(error);
    return response.send({ error: error });
  }
};

module.exports = upcomingTasks;