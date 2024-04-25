const database = require("../../helpers/database.helper");
const logger = require("../../logger/logger");

//converting current date into mysql compatible format
const currentDate = new Date().toISOString().split("T")[0];
const db = new database();

const getdashboardata = async (request, response) => {
  try {

    let id = 3;
    let res = {};
    
    let employeeUpCommingDeadlineQuery = `select task_name as Task, task_end_date as "Due Date", urgency.type as Urgency, importants.type as Importance, task_status as Status from tasks_assigend_to inner join tasks on tasks_assigend_to.task_id=tasks.id inner join priorities on priorities.id = tasks.prioritiy_id inner join urgency on urgency.id = priorities.urgency_id inner join importants on importants.id = priorities.important_id where emp_id = ? and task_end_date >= ? and task_status != 'completed'`;

    let employeeInprogressTaskQuery = `select task_name as Task, task_end_date as "Due Date" from tasks_assigend_to inner join tasks on tasks_assigend_to.task_id=tasks.id inner join priorities on priorities.id = tasks.prioritiy_id inner join urgency on urgency.id = priorities.urgency_id inner join importants on importants.id = priorities.important_id where emp_id = ? and task_status="inprogress";`;

    
    res.upCommingDeadlineData = await db.executeQuery(employeeUpCommingDeadlineQuery, [id, currentDate]);
    res.employeeInprogressTaskData = await db.executeQuery(employeeInprogressTaskQuery, [id]);

    return response.json({ result: res });
  } catch (error) {
    logger.error("Dash data is not found !");
  }
};

const dashboard = async (request, response) => {
  let employeeTaskStatusCountsQuery = `select count(task_id) as Assigned, count(case when task_status = 'todo' then 1 end) as ToDo,count(case when task_status = 'inprogress' then 1 end) as InProgress, count(case when task_status = 'completed' then 1 end) as Completed from tasks_assigend_to inner join tasks on tasks_assigend_to.task_id=tasks.id where emp_id = ?`;
  [taskStatusCounts] = await db.executeQuery(employeeTaskStatusCountsQuery, 3);
  response.render("employeemodule/dashboard", { taskStatusCounts });
};


module.exports = { getdashboardata, dashboard };
