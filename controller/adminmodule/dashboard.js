const database = require("../../helpers/database.helper");
const logger = require("../../logger/logger");
var db = new database();

exports.adminDashboard = async (request, response) => {
    try {
        
        let query = `select r.role_name,count(*) as count from users as u inner join roles as r on u.role_id = r.id where u.status = ? group by u.role_id having r.role_name = ?`;
        let [count] = await db.executeQuery(query, [1,"Employee"]);
        let [count1] = await db.executeQuery(query, [1,"Manager"]);

        let employeeCount = 0;
        if (count !== undefined) {
            employeeCount = count.count;
        }
        let managerCount = 0;
        if (count1 !== undefined) {
            managerCount = count1.count;
        }

        let [teamCount] = await db.executeQuery(`select count(*) as count from teams where is_active = ?`,[1]);
        if (teamCount !== undefined) {
            teamCount = teamCount.count;
        }

        let [count4] = await db.executeQuery(`select task_status,count(*) as count from tasks where status = ? group by task_status having task_status = ?`, [1,"completed"]);
        let completedCount = 0;
        if (count4 !== undefined) {
            completedCount = count4.count;
        }

        let [category] = await db.executeQuery(`select count(*) as count from categories where status = ?`,[1]);
        if (category !== undefined) {
            category = category.count;
        }

        let [totalTask] = await db.executeQuery(`select count(*) as count from tasks where status = ?`,[1]);
        if (totalTask !== undefined) {
            totalTask = totalTask.count;
        }
        response.render("adminmodule/dashboard", { employeeCount, managerCount, teamCount, completedCount, category, totalTask })
    } catch (err) {
        logger.error("Admin dashboard data error !")
    }
}

exports.chartsData = async (request, response) => {
    try {
        let countquery = `select task_status as label , count(*) as data from tasks where status = ? group by task_status having task_status = ?`
        let todoCount = await db.executeQuery(countquery,[1,"todo"]);
        let inprogressCount = await db.executeQuery(countquery, [1,"inprogress"]);
        let completedCount = await db.executeQuery(countquery, [1,"completed"]);
        return response.json({ todoCount,inprogressCount,completedCount })
    } catch (err) {
        logger.error("Admin dashboard data error !")
    }
}

exports.managerTask = async (request, response) => {
    try {
        let managerAssignTask = await db.executeQuery(`select t.id,t.task_name,u.first_name,DATE_FORMAT(t.create_at, "%Y-%m-%d") as create_date from users as u inner join tasks as t on t.manager_id = u.id where DATE_FORMAT(t.create_at, "%Y-%m-%d") = current_date() and (t.task_status = ? or t.task_status = ?) order by t.create_at desc`, ["todo","inprogress"]);
        return response.json({ managerAssignTask })
    } catch (err) {
        logger.error("Admin dashboard data error !")
    }
}

