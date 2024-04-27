const database = require("../../helpers/database.helper");
const logger = require("../../logger/logger")
var calendar = require('node-calendar');
let db = new database();

exports.adminCalender = (request, response) => {
    try {
        response.render("adminmodule/calender")
    } catch (err) {
        logger.error("Calendar not found it!");
    }
}

exports.calenderMonth = async (request, response) => {
    try {
        current_month = request.params.month;
        var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var cal = new calendar.Calendar(calendar.SUNDAY);
        var yearCalendar = cal.monthdayscalendar(2024, current_month);

        return response.json({ days: days, yearCalendar: yearCalendar });
    } catch (err) {
        logger.error("Calendar not found it!");
    }
}

exports.dueDateTask = async (request, response) => {
    try {
        let result = await db.executeQuery(`select task_name, DATE_FORMAT(task_end_date, "%Y-%m-%d") as end_date from tasks where status = 1 and (task_status = "todo" or task_status = "inprogress")`);
        return response.json({ result })
    } catch (err) {
        logger.error("Calendar not found it!");
    }
}

