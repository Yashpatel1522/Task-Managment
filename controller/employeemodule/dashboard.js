const database = require("../../helpers/database.helper");

const getdashboardata = async (request,response) => {
    try{
        let userTaskDashoardQuery = `select count(task_id) as Assigned, (select count(task_status) from tasks where task_status="In Progress") as inProgress, (select count(task_status) from tasks where task_status="Completed") as completed from tasks_assigend_to inner join tasks where emp_id = 1;`
        
        let db=new database()
        let res=await db.executeQuery(userTaskDashoardQuery)
        console.log(res); 
        return response.json({result:res[0]})
    }
    catch(error){
        console.log(error);
        return response.send('error')
    }

}

module.exports = {getdashboardata}