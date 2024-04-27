const database = require("../../helpers/database.helper");
const logger = require("../../logger/logger");
var calendar = require("node-calendar");
let db = new database();

const calenderView = (request, response) => {
  try {
    response.render("../views/managermodule/calender", {
      id: request.user.id,
    });
  } catch (error) {
    logger.error(error);
  }
};

const calenderMonth = async (request, response) => {
  try {
    let currentMonth = request.params.month;
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
    var yearCalendar = cal.monthdayscalendar(2024, currentMonth);
    return response.json({ days: days, yearCalendar: yearCalendar });
  } catch (err) {
    logger.error("Calendar not found it!");
  }
};

const dueDateTask1 = async (request, response) => {
  try {
    let managerId = request.user.id;
    let result = await db.executeQuery(
      `select task_name, DATE_FORMAT(task_end_date, "%Y-%m-%d") as end_date from tasks where status = 1 and (task_status = "todo" or task_status = "inprogress") and manager_id = ${managerId}`
    );
    return response.json({ result });
  } catch (err) {
    logger.error("Calendar not found it!");
  }
};

module.exports = { calenderView, calenderMonth, dueDateTask1 };
