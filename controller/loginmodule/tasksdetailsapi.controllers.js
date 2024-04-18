const database = require("../../helpers/database.helper")

const taskDetailsApiGet=async(request,response)=>{
  let db=new database()
  response.send(await db.executeQuery("select * from tasks"))
}
module.exports=taskDetailsApiGet