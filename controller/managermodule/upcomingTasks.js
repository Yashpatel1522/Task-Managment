const database = require("../../helpers/database.helper");
const logger = require("../../logger/logger")

const upcomingTasks = async (request,response) => {
    try{
        let q = `select * from tasks where task_end_date between ? and ? and manager_id = ? and task_status != 'compleated' and status = 1;`;
        let db=new database();
        console.log(request.query.start_date + request.query.end_date + request.query.manager_id);
        let res=await db.executeQuery(q, [request.query.start_date, request.query.end_date, request.query.manager_id]); 
        return response.json({result:res})
    }
    catch(error){
        logger.log(error);
        return response.send({'error': error})
    }

}

module.exports = upcomingTasks;