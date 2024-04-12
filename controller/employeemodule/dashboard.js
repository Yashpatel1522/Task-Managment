const database = require("../../helpers/database.helper");

const getdashboardata = async (request,response) => {
    try{
        let userTaskDashoardQuery = `select count(task_id) as Assigned, (select count(task_status) from tasks where task_status="inprogress") as InProgress, (select count(task_status) from tasks where task_status="completed") as Completed from tasks_assigend_to inner join tasks on tasks_assigend_to.task_id=tasks.id where emp_id = 3;`
        
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