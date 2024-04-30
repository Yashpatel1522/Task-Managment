const database = require("../../helpers/database.helper");
const logger = require("../../logger/logger");
let db = new database();

const getPdfData = async (request, response) => {
    try {
      let managerId = request.user?.id || 2;
      let employeeQ = `select id, first_name, last_name, email from users where id in (select distinct(emp_id) from tasks_assigend_to) and status = 1`;
      let employeeRes = await db.executeQuery(employeeQ);
      


      return response.json({ employeeRes: employeeRes });
    } catch (error) {
      logger.log(error);
      return response.send({ error: error });
    }
  };


  module.exports = getPdfData;