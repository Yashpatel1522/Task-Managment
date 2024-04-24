const database = require("../../helpers/database.helper");
const logger = require("../../logger/logger");

//converting current date into mysql compatible format
const currentDate = new Date().toISOString().split("T")[0];
const db = new database();

const getdashboardata = async (request, response) => {
  try {
    // console.log(request.user.id)
    // let id = request.user.id;
    let id = 1
    let res = {};
    let employeeTaskStatusCountsQuery = `select count(task_id) as Assigned, count(case when task_status = 'todo' then 1 end) as "To Do",count(case when task_status = 'inprogress' then 1 end) as "In Progress", count(case when task_status = 'completed' then 1 end) as Completed from tasks_assigend_to inner join tasks on tasks_assigend_to.task_id=tasks.id where emp_id = ?;`;

    let employeeUpCommingDeadlineQuery = `select task_name as Task, task_end_date as "Due Date", urgency.type as Urgency, importants.type as Importance, task_status as Status from tasks_assigend_to inner join tasks on tasks_assigend_to.task_id=tasks.id inner join priorities on priorities.id = tasks.prioritiy_id inner join urgency on urgency.id = priorities.urgency_id inner join importants on importants.id = priorities.important_id where emp_id = ? and task_end_date >= ? and task_status != 'completed'`;

    let employeeInprogressTaskQuery = `select task_name as Task, task_end_date as "Due Date", urgency.type as Urgency, importants.type as Importance from tasks_assigend_to inner join tasks on tasks_assigend_to.task_id=tasks.id inner join priorities on priorities.id = tasks.prioritiy_id inner join urgency on urgency.id = priorities.urgency_id inner join importants on importants.id = priorities.important_id where emp_id = ? and task_status="inprogress";`;

    res.taskStatusCounts = await db.executeQuery(employeeTaskStatusCountsQuery,[id]);
    res.upCommingDeadlineData = await db.executeQuery(employeeUpCommingDeadlineQuery,[id,currentDate]);
    res.employeeInprogressTaskData = await db.executeQuery(employeeInprogressTaskQuery,[id]);

    res.imagename = await db.executeQuery(
      `select newimage_name from user_profiles where user_id = ? and is_deleted = 0`,[id]
    );


    return response.json({ result: res });
  } catch (error) {
    logger.error("Dash data is not found !");
  }
};
const dashboard = (request, response) => {
  response.render("employeemodule/dashboard");
};

module.exports = { getdashboardata, dashboard };
