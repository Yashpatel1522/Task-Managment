const database = require("../../helpers/database.helper");
const logger = require("../../logger/logger");
var calendar = require("node-calendar");
let db = new database();

exports.employeeCalender = (request, response) => {
  try {
    response.render("employeemodule/calender");
  } catch (err) {
    logger.error("Calendar not found it!");
  }
};
exports.empcalenderMonth = async (request, response) => {
  try {
    current_month = request.params.month;
    var days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    var cal = new calendar.Calendar(calendar.SUNDAY);
    var yearCalendar = cal.monthdayscalendar(2024, current_month);
    return response.json({ days: days, yearCalendar: yearCalendar });
  } catch (err) {
    logger.error("Calendar not found it!");
  }
};

exports.empdueDateTask = async (request, response) => {
  try {
    let q = `select task_name, DATE_FORMAT(task_end_date, "%Y-%m-%d") as end_date from tasks join tasks_assigend_to on tasks.id=tasks_assigend_to.task_id where (tasks.task_status="inprogress" or tasks.task_status="todo") and tasks_assigend_to.emp_id=4 and year(task_end_date)=year(curdate())`;
    let result = await db.executeQuery(q);
    return response.json({ result });
  } catch (err) {
    logger.error("Calendar not found it!");
  }
};
