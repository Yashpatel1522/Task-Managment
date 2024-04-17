const setNewPassword = require("../../services/auth/setnewpassword")

const acticationGet=(request,response)=>{
  console.log(request.rawHeaders)
  response.render("loginmodule/setnewpassword")
}

const acticationPost=async(request,response)=>{
  let activationcode=request.params.activationcode
  let res=await setNewPassword(activationcode,request.body.new_password)
  if(res.flag==false)
  {
      response.send(res).status(200)
  }
  else
  {
      response.send(res).status(500)
  }
}

module.exports={acticationGet,acticationPost};