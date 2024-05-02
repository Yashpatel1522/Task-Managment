const { request } = require("express");
const database = require("../../helpers/database.helper");
const logger = require("../../logger/logger");
let db = new database();

const managersTasks = async (request, response) => {
  try {
    let managerId = request.user.id;
    let managerTaskDashoardQuery = `select * from tasks where manager_id = ? and status = ?;`;
    let res = await db.executeQuery(managerTaskDashoardQuery, [managerId, 1]);
    return response.json({ result: res });
  } catch (error) {
    logger.log(error);
    return response.send({ error: error });
  }
};

const searchsTask = async (request, response) => {
  try {
    let managerId = request.user.id;
    let search = request.params.searchdata;
    search = "%" + search + "%";
    let query = `select * from tasks where task_status = ? and (task_name like ? or task_description like ?) and manager_id = ${managerId}`;
    let todoTask = await db.executeQuery(query, [
      "todo",
      search,
      search,
      request.user.id,
    ]);
    let inprogressTask = await db.executeQuery(query, [
      "inprogress",
      search,
      search,
      request.user.id,
    ]);
    let completedTask = await db.executeQuery(query, [
      "completed",
      search,
      search,
      request.user.id,
    ]);
    return response.json({ todoTask, inprogressTask, completedTask });
  } catch (err) {
    logger.error("Not task found it!");
  }
};

const notifications = async (request, response) => {
  try {
    let managerId = request.user.id;
    let notificationQuery = `SELECT task_name , DATE_FORMAT(tasks.task_end_date, '%Y-%m-%d') as due_date
        FROM tasks 
        WHERE tasks.task_end_date = CURDATE() and manager_id = ${managerId}`;
    let res = await db.executeQuery(notificationQuery);
    return response.json(res);
  } catch (error) {
    logger.error(error);
  }
};

module.exports = {managersTasks, searchsTask, notifications };
