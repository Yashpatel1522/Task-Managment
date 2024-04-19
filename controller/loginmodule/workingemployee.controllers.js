const database = require("../../helpers/database.helper")

const workingEmployyeInTask=async(request,response)=>{
  let db=new database()
  response.send(await db.executeQuery(`select t.*,u.first_name,u.last_name from tasks_assigend_to as t left join users as u on t.emp_id = u.id where task_id = ?;`,[request.params.taskid]))
}
module.exports=workingEmployyeInTask