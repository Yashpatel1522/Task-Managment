const { request } = require("express");
const database = require("../../helpers/database.helper");
const logger = require("../../logger/logger");

const managerTasks = async (request,response) => {
    try{
        let managerTaskDashoardQuery = `select * from tasks where manager_id = 3 and task_status = 'todo';`;
        console.log("IN func");
        let db=new database();
        let res=await db.executeQuery(managerTaskDashoardQuery);
        console.log(res); 
        return response.json({result:res})
    }
    catch(error){
        logger.log(error);
        return response.send({'error': error})
    }

}

const searchTask = async(request,response)=>{
    try {
        let serachquery = `select * from tasks where task_name = "abc"`
        let db=new database();
        let res=await db.executeQuery(serachquery);
        return response.json(res);
    } catch (error) {
        logger.log(error)
    }
}

module.exports = {managerTasks,searchTask};