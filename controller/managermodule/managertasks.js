const database = require("../../helpers/database.helper");

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
        console.log(error);
        return response.send({'error': error})
    }

}

module.exports = managerTasks;