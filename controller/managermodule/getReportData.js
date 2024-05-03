const database = require("../../helpers/database.helper");
const logger = require("../../logger/logger");
let db = new database();

const getReportData = async (request, response) => {
  try {
    let managerId = request.user?.id || 2;
    let employeeQ = `select id, first_name, last_name, email from users where id in (select distinct(emp_id) from tasks_assigend_to) and status = 1`;
    let employeeRes = await db.executeQuery(employeeQ);

    let reportData = {};
    let reportQ = `select users.first_name, users.last_name, tasks_assigend_to.emp_id, tasks_assigend_to.finished_at, tasks.task_end_date from tasks_assigend_to
      inner join users on users.id = tasks_assigend_to.emp_id
      inner join tasks on tasks.id = tasks_assigend_to.task_id
      where tasks.manager_id = ?;`;
    let res = await db.executeQuery(reportQ, [managerId]);

    let result = res.reduce((acc, curr) => {
      acc[curr.emp_id] ??= {
        first_name: curr.first_name,
        last_name: curr.last_name,
        end_date: [],
        finished_date: []
      }
      acc[curr.emp_id].finished_date.push(curr.finished_at),
        acc[curr.emp_id].end_date.push(curr.task_end_date)
      return acc;

    }, reportData);

    const keys = Object.keys(result);
    let avgArr = [];
    keys.forEach(element => {
      let counter = 0;
      result[element].finished_date.forEach(function (elementArr, index) {
        if (elementArr < result[element].end_date[index]) {
          counter++;
        }
      });
      avgArr.push(((counter / result[element].finished_date.length) * 100).toFixed(2));
    });

    return response.json({ employeeRes: employeeRes, reportData: avgArr });
  } catch (error) {
    logger.log(error);
    return response.send({ error: error });
  }
};


module.exports = getReportData;