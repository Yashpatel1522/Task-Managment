
const database = require("../../helpers/database.helper");
const logger = require("../../logger/logger");


exports.adminTasks = async (request,response) => {
    try {
        let db = new database();
        let query = `select t.*,u.first_name from tasks as t inner join users as u on t.manager_id = u.id where task_status=?`;
        let todoData = await db.executeQuery(query, ["todo"]);
        let inprogressData = await db.executeQuery(query, ["inprogress"]);
        let completedData = await db.executeQuery(query, ["completed"]);
        return response.json({todoData:todoData,inprogress:inprogressData,complete:completedData});
    } catch (err) {
        console.log(err);
        // logger.error(err);
    }
}

exports.searchTasks = async (request,response) =>{
    try {
        let search = request.params.searchdata;
        search = "%" + search + "%";
        let db = new database();
        let query = `select * from tasks where task_status = ? and (task_name like ? or task_description like ?)`;
        let todoTask = await db.executeQuery(query, ["todo",search,search]);
        let inprogressTask = await db.executeQuery(query, ["inprogress", search, search]);
        let completedTask = await db.executeQuery(query, ["completed", search, search]);
        return response.json({todoTask,inprogressTask,completedTask});
    } catch (err) {
        console.log(err);
        // logger.error(err);
    }
}

exports.taskDetail = async(request, response)=>{
    try{
        let taskId = request.params.id;
        let db = new database();
        let query = `select t.id,t.task_name,t.task_description,t.task_start_date,t.task_end_date,t.task_status,c.category,p.id as priority_id,users.first_name as manager from tasks as t left join categories as c on t.category_id = c.id left join priorities as p on t.prioritiy_id = p.id left join users on t.manager_id = users.id where t.id = ?`
        let taskDetail = await db.executeQuery(query, [taskId]);

        let priorityQuery = `select p.id,u.type as urgency ,i.type as importance from priorities as p left join urgency as u on p.urgency_id = u.id left join importants as i on p.important_id = i.id where p.id = ?`;
        let priorities = await db.executeQuery(priorityQuery, [taskDetail[0].priority_id]);

        let employeeQuery = `select t.*,u.first_name from tasks_assigend_to as t left join users as u on t.emp_id = u.id where task_id = ?`;
        let employees = await db.executeQuery(employeeQuery, [taskId]);
        // console.log(employees);
        return response.json({ taskDetail: taskDetail, priorities: priorities,employees:employees}) 
    }catch(err){
        console.log(err);
        // logger.error(err);
    }
}