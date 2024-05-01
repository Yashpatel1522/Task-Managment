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
    const toDate = nextDate.toISOString().slice(0, 10)
    // console.log(d.slice(0, 10));
    // console.log(console.log(currentDate));
    let q = `select * from tasks where task_end_date between ? and ? and manager_id = ? and task_status != 'compleated' and status = 1;`;
    let res = await db.executeQuery(q, [fromDate, toDate, managerId]);

    let teamQ = `select * from teams where created_by = ? and is_active = ?;`;
    let teamRes = await db.executeQuery(teamQ, [managerId, 0]);

    return response.json({result: res, teamResult: teamRes});
  } catch (error) {
    console.log(error);
    logger.error(error);
    return response.send({error: error});
  }
};

module.exports = upcomingTasks;