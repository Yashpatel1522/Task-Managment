const database = require("../../helpers/database.helper");
const logger = require("../../logger/logger");

const editTask = async (request, response) => {
  try {
     console.log(request.body);
     let db = new database();

    let getCategory = `select id from categories where category = ?`;
    let categoryRes = await db.executeQuery(getCategory, [request.body.category]);
    // console.log("Category Id : "+categoryRes[0].id);
    
    let tasksUpdate = `update tasks set task_name = ?, task_description = ?, category_id = ?, task_status = ?, task_start_date = ?, task_end_date = ? where task_id = ?;`;
    // let taskRes = await db.executeQuery(tasksUpdate, [request.body.task_name, request.body.description, categoryRes[0].id, request.body.status, request.body.start_date, request.body.end_date, request.body.id]);


    let getPriority = `select id from priorities where urgency_id = (select id from urgency where type = ?) and important_id = (select id from importants where type = ?);`;
    let priorityRes = await db.executeQuery(getPriority, [request.body.Urgency, request.body.importance]);

    // console.log("Importance ID : "+priorityRes[0].id);


    let updatedPriority = `update tasks set prioritiy = ? where id = ?;`;
    // let updatePriorityRes = await db.executeQuery(updatedPriority, [priorityRes[0].id, request.body.id]);


    let deleteEmployee = `delete from tasks_assigend_to where task_id = ?;`;
    // let delEmployeeRes = await db.executeQuery(deleteEmployee, [request.body.id]);


    // if(typeof(request.body.emp == '')) {

    // }
    // request.body.emp.forEach(async function(element) {
    //     let insertEmployee = `insert into tasks_assigend_to (task_id, emp_id) values (?, ?);`;
    //     let insEmployeeRes = await db.executeQuery(insertEmployee, [request.body.id, element]);
    // });


    return response.send('Updated');
    // return response.json({ result: res });
  } catch (error) {
    logger.error(error);
    return response.send({ error: error });
  }
};

module.exports = editTask;
