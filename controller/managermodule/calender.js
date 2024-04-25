const database = require("../../helpers/database.helper");
const logger = require("../../logger/logger");
let db = new database();
const calenderView = (request, response) => {
  try {
    // console.log(request.user.id);
    response.render("../views/managermodule/calender", {
      // id: request.user.id,
    });
  } catch (error) {
    logger.error(error);
  }
};

const dueDateTask1 = async (request, response) => {
  try {
    let result = await db.executeQuery(
      `select task_name, DATE_FORMAT(task_end_date, "%Y-%m-%d") as end_date from tasks where status = 1 and (task_status = "todo" or task_status = "inprogress") and manager_id = 1`
    );
    return response.json({ result });
  } catch (err) {
    logger.error("Calendar not found it!");
  }
};

module.exports = { calenderView, dueDateTask1 };
