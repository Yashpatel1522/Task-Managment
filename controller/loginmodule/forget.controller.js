const forgetpassword = require("../../services/auth/forgetpassword")
const setNewPassword = require("../../services/auth/setnewpassword")

const forgetGet=(request,response)=>{
  response.render("loginmodule/forgetpassword")
}

const forgetPost=async(request,response)=>{
  let res=await forgetpassword(request.body.username)
  console.log(res)
  if(res.flag==true)
  {
    response.send(res).status(200)
  }
  else
  {
    response.send(res).status(500)
  }
}

module.exports={forgetGet,forgetPost};