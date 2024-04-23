const database = require("../../helpers/database.helper")
const logger = require("../../logger/logger")

const updateTaskDetailsPost=async(request,response)=>{
  try{
  let db=new database()
  let res=await db.updateAnd({task_status:request.body.task_status},"tasks",{id:request.body.taskId})
  }
  catch(err){
    logger.log(err)
  }
}

module.exports=updateTaskDetailsPost