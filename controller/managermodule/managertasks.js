const { request } = require("express");
const database = require("../../helpers/database.helper");
const logger = require("../../logger/logger");

const managerTasks = async (request, response) => {
  try {
    let managerTaskDashoardQuery = `select * from tasks where manager_id = 3 and task_status = 'todo';`;
    console.log("IN func");
    let db = new database();
    let res = await db.executeQuery(managerTaskDashoardQuery);
    console.log(res);
    return response.json({ result: res });
  } catch (error) {
    logger.log(error);
    return response.send({ error: error });
  }
};





const searchTask = async (request, response) => {
    try {
        let search = request.body;
        search = "%" + search + "%";
        let db = new database();
        let query = `select * from tasks where task_name like ? or task_description like ?;`;
        let taskData = await db.executeQuery(query, [search,search]);
        return response.json({taskData});
    } catch (err) {
        logger.error(err);
    }
};

const notifications = async (request, response) => {
  try {
    let notificationQuery = `SELECT task_name , DATE_FORMAT(tasks.task_end_date, '%Y-%m-%d') as due_date
        FROM tasks 
        WHERE tasks.task_end_date = CURDATE() and manager_id = 1`;
    let db = new database();
    let res = await db.executeQuery(notificationQuery);
    return response.json(res);
  } catch (error) {
    logger.error(error);
  }
};

module.exports = { managerTasks, searchTask, notifications };
