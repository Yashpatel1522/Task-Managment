const database = require("../../helpers/database.helper");
const logger = require("../../logger/logger");

const editTask = async (request, response) => {
  try {
      console.log(request.body);
      let db = new database();
    let tasksUpdate = `update tasks set task_name = ?, task_description = ?, category_id = ?, task_status = ?, task_start_date = ?, task_end_date = ? where task_id = ?;`;
    let taskRes = await db.executeQuery(tasksUpdate, [request.body.task_name, request.body.description]);


    let getPriority = `select id from priorities where urgency_id = (select id from urgency where type = ?) and important_id = (select id from importants where type = ?);`;

    let updatedPriority = `update tasks set prioritiy = ${getPriority.id} where id = ?;`;

    let deleteEmployee = `delete from tasks_assigend_to where task_id = ?;`;

    let insertEmployee = `insert into tasks_assigend_to (task_id, emp_id) values (?, ?);`;


    return response.send('Updated');
    // return response.json({ result: res });
  } catch (error) {
    logger.error(error);
    return response.send({ error: error });
  }
};

module.exports = editTask;
