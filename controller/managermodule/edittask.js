const database = require("../../helpers/database.helper");
const logger = require("../../logger/logger");
const Swal = require('sweetalert2');

const editTask = async (request, response) => {
  try {
     let db = new database();
    
    let tasksUpdate = `update tasks set task_name = ?, task_description = ?, category_id = ?, task_status = ?, task_start_date = ?, task_end_date = ? where id = ?;`;
    let taskRes = await db.executeQuery(tasksUpdate, [request.body.task_name, request.body.description, request.body.category, request.body.status, request.body.start_date, request.body.end_date, request.body.id]);


    let getPriority = `select id from priorities where urgency_id = ? and important_id = ?;`;
    let priorityRes = await db.executeQuery(getPriority, [request.body.Urgency, request.body.importance]);

    let updatedPriority = `update tasks set prioritiy_id = ? where id = ?;`;
    let updatePriorityRes = await db.executeQuery(updatedPriority, [priorityRes[0].id, request.body.id]);


    let deleteEmployee = `delete from tasks_assigend_to where task_id = ?;`;
    let delEmployeeRes = await db.executeQuery(deleteEmployee, [request.body.id]);

    if(request.body.emp) {
      if(Array.isArray(request.body.emp)) {
        request.body.emp.forEach(async function(element) {
            let insertEmployee = `insert into tasks_assigend_to (task_id, emp_id) values (?, ?);`;
            let insEmployeeRes = await db.executeQuery(insertEmployee, [request.body.id, element]);
        });
      }
      else {
          let insertEmployee = `insert into tasks_assigend_to (task_id, emp_id) values (?, ?);`;
          let insEmployeeRes = await db.executeQuery(insertEmployee, [request.body.id, element]);
      }
    }


    return response.redirect('/manager/tasks');
  } catch (error) {
    logger.error(error);
    return response.send({ error: error });
  }
};

module.exports = editTask;
