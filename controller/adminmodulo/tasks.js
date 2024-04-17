
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
        let query = `select * from tasks where task_name like ? or task_description like ?;`;
        let taskData = await db.executeQuery(query, [search,search]);
        return response.json({taskData});
    } catch (err) {
        logger.log(err);
        // logger.error(err);
    }
}