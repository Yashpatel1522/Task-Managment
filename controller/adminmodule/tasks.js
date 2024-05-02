const database = require("../../helpers/database.helper");
const logger = require("../../logger/logger");
const db = new database();

exports.taskpage = (request, response) => {
    try {
        response.render('./adminmodule/tasks')
    } catch (error) {
        logger.error("Task page is not render !")
    }
}

exports.adminTasks = async (request, response) => {
    try {
        let query = `select t.*,u.first_name from tasks as t inner join users as u on t.manager_id = u.id where task_status=? and t.status = ?`;
        let todoData = await db.executeQuery(query, ["todo", 1]);
        let inprogressData = await db.executeQuery(query, ["inprogress", 1]);
        let completedData = await db.executeQuery(query, ["completed", 1]);
        return response.json({ todoData: todoData, inprogress: inprogressData, complete: completedData });
    } catch (err) {
        logger.error("Task data is not found !");
    }
}

exports.searchTasks = async (request, response) => {
    try {
        let search = "%" + request.params.searchdata + "%";
        let query = `select * from tasks where task_status = ? and (task_name like ? or task_description like ?) and status = ?`;
        let todoTask = await db.executeQuery(query, ["todo", search, search,1]);
        let inprogressTask = await db.executeQuery(query, ["inprogress", search, search,1]);
        let completedTask = await db.executeQuery(query, ["completed", search, search,1]);
        return response.json({ todoTask, inprogressTask, completedTask });
    } catch (err) {
        logger.error("Not task found it!");
    }
}

exports.taskDetail = async (request, response) => {
    try {
        let taskId = request.params.id;
        let taskDetail = await db.executeQuery(`select t.id,t.task_name,t.task_description,t.task_start_date,t.task_end_date,t.task_status,c.category,p.id as priority_id,users.first_name as manager from tasks as t left join categories as c on t.category_id = c.id left join priorities as p on t.prioritiy_id = p.id left join users on t.manager_id = users.id where t.id = ?`, [taskId]);


        let priorities = await db.executeQuery(`select p.id,u.type as urgency ,i.type as importance from priorities as p left join urgency as u on p.urgency_id = u.id left join importants as i on p.important_id = i.id where p.id = ?`, [taskDetail[0].priority_id]);

        let employees = await db.executeQuery(`select t.*,concat(u.first_name, ' ', u.last_name) as employee from tasks_assigend_to as t left join users as u on t.emp_id = u.id where task_id = ?`, [taskId]);

        let teamtask = await db.executeQuery(`select t.*, te.team_name from  team_has_tasks as t left join teams as te on t.team_id = te.id where t.task_id = ?`, [taskId]);

        return response.json({ taskDetail: taskDetail, priorities: priorities, employees: employees, teamhastask: teamtask })
    } catch (err) {
        logger.error("Task Details Is Not Found!")
    }
}