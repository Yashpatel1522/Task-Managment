const database = require("../../helpers/database.helper");
const logger = require("../../logger/logger");

exports.managerTasks = async (request, response) => {
  try {
    console.log(request.user.id);
    let db = new database();
    let query = `select table1.*,table2.first_name from tasks as table1 inner join users as table2 on table1.manager_id = table2.id where task_status=? and manager_id=? and table1.status = ?`;
    let todoData = await db.executeQuery(query, ["todo", request.user.id, 1]);
    let inprogressData = await db.executeQuery(query, [
      "inprogress",
      request.user.id,
      1,
    ]);
    let completedData = await db.executeQuery(query, [
      "completed",
      request.user.id,
      1,
    ]);
    return response.json({
      todoData: todoData,
      inprogress: inprogressData,
      complete: completedData,
    });
  } catch (err) {
    logger.error("Task data is not found !");
  }
};
