const database = require("../../helpers/database.helper");
const logger = require("../../logger/logger");

const getAllTasks = async (request, response) => {
  try {
    let q = `select * from tasks where id = ? and status = 1;`;
    let db = new database();
    let res = await db.executeQuery(q, [request.params.id]);

    let categoryQ = `select category from categories where id in (select category_id from tasks where id = ? and status = 1);`;
    let categoryRes = await db.executeQuery(categoryQ, [request.params.id]);

    let urgencyQ = `select type from urgency where id in (select urgency_id from priorities where id in (select prioritiy_id from tasks where id = ? and status = 1));`;
    let urgencyRes = await db.executeQuery(urgencyQ, [request.params.id]);

    let importanceQ = `select type from importants where id in (select important_id from priorities where id in (select prioritiy_id from tasks where id = ? and status = 1));`;
    let importanceRes = await db.executeQuery(importanceQ, [request.params.id]);

    let managerQ = `select first_name, last_name from users where id in (select manager_id from tasks where id = ? and status = 1)`;
    let managerRes = await db.executeQuery(managerQ, [request.params.id]);

    let employeeQ = `select id,first_name from users where id in (select emp_id from tasks_assigend_to where task_id = ? and role_id = 3 and status = 1);`;
    let employeeRes = await db.executeQuery(employeeQ, [request.params.id]);

    let extraEmployeeQ = `select id,first_name from users where id not in (select emp_id from tasks_assigend_to where task_id = ? and role_id = 3) and role_id = 3 and status = 1;`;
    let extraEmployeeRes = await db.executeQuery(extraEmployeeQ, [request.params.id]);

    return response.json({
      result: res,
      categoryResult: categoryRes,
      urgencyResult: urgencyRes,
      importanceResult: importanceRes,
      managerName: `${managerRes[0].first_name} ${managerRes[0].last_name}`,
      employeeResult: employeeRes,
      extraEmployeeResult: extraEmployeeRes
    });
  } catch (error) {
    logger.error(error);
    return response.send({ error: error });
  }
};

module.exports = getAllTasks;