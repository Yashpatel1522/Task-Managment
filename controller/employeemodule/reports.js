const { request, response } = require("express");
const database = require("../../helpers/database.helper");
const logger = require("../../logger/logger");
const { Console } = require("winston/lib/winston/transports");
let db = new database();
const reportGet = (request, response) => {
  try {
    response.render("employeemodule/reports");
  } catch (error) {
    logger.log(error);
  }
};

const taskWiseComent = async (request, response) => {
  let result = await db.executeQuery(
    `select * from tasks as t left join tasks_assigend_to as ta on t.id=ta.task_id where ta.emp_id=1 and t.task_status="completed";`
  );
  return result;
};

const completedTasks = async (request, response) => {
  let result = await taskWiseComent();
  let res2;
  let task;
  for (let i = 0; i < result.length; i++) {
    task = result[i];
    res2 = await db.executeQuery(
      `select * from user_comments where employee_id=${task.emp_id} and task_id=${task.task_id} and task_status="completed"`
    );
    console.log(res2[0]);
    result[i].comment = res2;
  }
  response.send(result);
};
module.exports = { reportGet, completedTasks };
