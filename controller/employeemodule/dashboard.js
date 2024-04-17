const database = require("../../helpers/database.helper");

const getdashboardata = async (request,response) => {
    try{
        // let userTaskDashoardQuery = `select count(task_id) as Assigned, (select count(task_status) from tasks where task_status="In Progress") as InProgress, (select count(task_status) from tasks where task_status="Completed") as Completed from tasks_assigend_to inner join tasks where emp_id = 1;`

        //converting current date into mysql compatible format
        const currentDate = new Date().toISOString().split("T")[0]
        let res = {}
        let employeeTaskStatusCountsQuery = `select count(task_id) as Assigned, count(case when task_status = 'todo' then 1 end) as ToDo,count(case when task_status = 'inprogress' then 1 end) as InProgress, count(case when task_status = 'completed' then 1 end) as Completed from tasks_assigend_to inner join tasks on tasks_assigend_to.task_id=tasks.id where emp_id = 1;`

        let employeeUpCommingDeadlineQuery =  `select task_name as Task, task_end_date as DueDate, urgency.type as Flag, task_status as Status from tasks_assigend_to inner join tasks on tasks_assigend_to.task_id=tasks.id inner join priorities on priorities.id = tasks.prioritiy_id inner join urgency on urgency.id = priorities.urgency_id where emp_id = 1 and task_end_date >= '${currentDate}';`

        let employeeInprogressTaskQuery =  `select task_name as Task, task_end_date as DueDate, urgency.type as Flag from tasks_assigend_to inner join tasks on tasks_assigend_to.task_id=tasks.id inner join priorities on priorities.id = tasks.prioritiy_id inner join urgency on urgency.id = priorities.urgency_id where emp_id = 1 and task_status="inprogress";`
        
        let db=new database()
        let employeeTaskStatusCounts=await db.executeQuery(employeeTaskStatusCountsQuery)
        let employeeUpCommingDeadlineData=await db.executeQuery(employeeUpCommingDeadlineQuery)
        let employeeInprogressTaskData=await db.executeQuery(employeeInprogressTaskQuery)


        res.taskStatusCounts = employeeTaskStatusCounts
        res.upCommingDeadlineData = employeeUpCommingDeadlineData
        res.employeeInprogressTaskData = employeeInprogressTaskData

        return response.json({result:res})
    }
    catch(error){
        return response.send(error)
    }

}
const dashboard = (request, response) => {
    response.render('employeemodule/dashboard')
}

module.exports = {getdashboardata,dashboard}