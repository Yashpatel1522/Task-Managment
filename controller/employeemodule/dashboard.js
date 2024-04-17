const database = require("../../helpers/database.helper");

//converting current date into mysql compatible format
const currentDate = new Date().toISOString().split("T")[0];
const db = new database();

const getdashboardata = async (request, response) => {
  try {

    let res = {};
    let employeeTaskStatusCountsQuery = `select count(task_id) as Assigned, count(case when task_status = 'todo' then 1 end) as ToDo,count(case when task_status = 'inprogress' then 1 end) as InProgress, count(case when task_status = 'completed' then 1 end) as Completed from tasks_assigend_to inner join tasks on tasks_assigend_to.task_id=tasks.id where emp_id = ?;`;

    let employeeUpCommingDeadlineQuery = `select task_name as Task, task_end_date as DueDate, urgency.type as Urgency, importants.type as Importance, task_status as Status from tasks_assigend_to inner join tasks on tasks_assigend_to.task_id=tasks.id inner join priorities on priorities.id = tasks.prioritiy_id inner join urgency on urgency.id = priorities.urgency_id inner join importants on importants.id = priorities.important_id where emp_id = ? and task_end_date >= ?;`;

    let employeeInprogressTaskQuery = `select task_name as Task, task_end_date as DueDate, urgency.type as Urgency, importants.type as Importance from tasks_assigend_to inner join tasks on tasks_assigend_to.task_id=tasks.id inner join priorities on priorities.id = tasks.prioritiy_id inner join urgency on urgency.id = priorities.urgency_id inner join importants on importants.id = priorities.important_id where emp_id = ? and task_status="inprogress";`;

    res.taskStatusCounts = await db.executeQuery(employeeTaskStatusCountsQuery,[1]);
    res.upCommingDeadlineData = await db.executeQuery(employeeUpCommingDeadlineQuery,[1,currentDate]);
    res.employeeInprogressTaskData = await db.executeQuery(employeeInprogressTaskQuery,[1]);


    return response.json({ result: res });
  } catch (error) {
    return response.send(error);
  }
};
const dashboard = (request, response) => {
  response.render("employeemodule/dashboard");
};

module.exports = { getdashboardata, dashboard };
