const database = require("../../helpers/database.helper");
const logger = require("../../logger/logger")

const upcomingTasks = async (request,response) => {
    try{
        let q = `select * from teams where created_by = ? and is_active = 1;`;
        let db=new database();
        let res=await db.executeQuery(q, [request.query.created_by]); 
        return response.json({result:res})
    }
    catch(error){
        logger.log(error);
        return response.send({'error': error})
    }
}

module.exports = upcomingTasks;