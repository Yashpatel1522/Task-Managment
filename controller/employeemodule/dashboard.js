const database = require("../../helpers/database.helper");
const logger = require("../../logger/logger");

//converting current date into mysql compatible format
const currentDate = new Date().toISOString().split("T")[0];
const db = new database();

const getdashboardata = async (request, response) => {
  try {

    let id = 4;
    let res = {};
    let employeeTaskStatusCountsQuery = `select count(task_id) as Assigned, count(case when task_status = 'todo' then 1 end) as "To Do",count(case when task_status = 'inprogress' then 1 end) as "In Progress", count(case when task_status = 'completed' then 1 end) as Completed from tasks_assigend_to inner join tasks on tasks_assigend_to.task_id=tasks.id where emp_id = ?;`;

    let employeeUpCommingDeadlineQuery = `select task_name as Task, task_end_date as "Due Date", urgency.type as Urgency, importants.type as Importance, task_status as Status from tasks_assigend_to inner join tasks on tasks_assigend_to.task_id=tasks.id inner join priorities on priorities.id = tasks.prioritiy_id inner join urgency on urgency.id = priorities.urgency_id inner join importants on importants.id = priorities.important_id where emp_id = ? and task_end_date >= ? and task_status != 'completed'`;

    let employeeInprogressTaskQuery = `select task_name as Task, task_end_date as "Due Date", urgency.type as Urgency, importants.type as Importance from tasks_assigend_to inner join tasks on tasks_assigend_to.task_id=tasks.id inner join priorities on priorities.id = tasks.prioritiy_id inner join urgency on urgency.id = priorities.urgency_id inner join importants on importants.id = priorities.important_id where emp_id = ? and task_status="inprogress";`;

    let employeeRecentActivityTeamQuery = `select t.id,t.team_name,u.first_name,DATE_FORMAT(t.create_at, "%Y-%m-%d") as create_date from users as u inner join teams as t on t.created_by = u.id inner join team_members as tm on tm.team_id = t.id where DATE_FORMAT(t.create_at, "%Y-%m-%d") = current_date() and t.is_active = "1" and tm.emp_id = ? order by t.create_at desc`

    let employeeRecentActivityTaskQuery = `select t.task_name,u.first_name,DATE_FORMAT(ta.create_at, "%Y-%m-%d") as create_date from users as u inner join tasks as t on t.manager_id = u.id inner join tasks_assigend_to as ta on ta.task_id = t.id where DATE_FORMAT(ta.create_at, "%Y-%m-%d") = current_date() and (t.task_status = "todo" or t.task_status = "inprogress") and ta.emp_id = ? order by ta.create_at desc;`

    res.taskStatusCounts = await db.executeQuery(employeeTaskStatusCountsQuery, [id]);
    res.upCommingDeadlineData = await db.executeQuery(employeeUpCommingDeadlineQuery, [id, currentDate]);
    res.employeeInprogressTaskData = await db.executeQuery(employeeInprogressTaskQuery, [id]);
    res.employeeRecentActivityTeamData = await db.executeQuery(employeeRecentActivityTeamQuery,[id])
    res.employeeRecentActivityTaskData = await db.executeQuery(employeeRecentActivityTaskQuery,[id])

    return response.json({ result: res });
  } catch (error) {
    logger.error("Dash data is not found !");
  }
};
const dashboard = (request, response) => {
  response.render("employeemodule/dashboard");
};


module.exports = { getdashboardata, dashboard };
