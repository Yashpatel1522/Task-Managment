const database = require("../../helpers/database.helper")

const acticationGet=(request,response)=>{
  response.render("loginmodule/setnewpassword")
}

const acticationPost=async(request,response)=>{
  let activationcode=request.params.activationcode
  console.log(activationcode)
  let db=new database()
  let res=await db.executeQuery(`select * from users where activation_code=?`,[activationcode])
  console.log(res)
}

module.exports={acticationGet,acticationPost};