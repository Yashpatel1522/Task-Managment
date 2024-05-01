const database = require("../../helpers/database.helper");
const logger = require("../../logger/logger");
let db = new database();
const upcomingTasks = async (request, response) => {
  try {
    let managerId = request.user.id;
    let q = `select * from tasks where task_end_date between ? and ? and manager_id = ? and task_status != 'compleated' and status = 1;`;
    let res = await db.executeQuery(q, ["2019-04-25", "2024-04-30", managerId]);

    let teamQ = `select * from teams where created_by = ? and is_active = ?;`;
    let teamRes = await db.executeQuery(teamQ, [managerId, 0]);

    return response.json({ result: res, teamResult: teamRes });
  } catch (error) {
    logger.error(error);
    return response.send({ error: error });
  }
};

module.exports = upcomingTasks;
