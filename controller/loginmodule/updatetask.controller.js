const database = require("../../helpers/database.helper")

const updateTaskDetailsPost=async(request,response)=>{
  let db=new database()
  let res=await db.updateAnd({task_status:request.body.task_status},"tasks",{id:request.body.taskId})
  console.log(res)
}

module.exports=updateTaskDetailsPost