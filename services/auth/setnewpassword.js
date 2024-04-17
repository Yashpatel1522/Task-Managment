const database = require("../../helpers/database.helper")
const bcrypt = require('bcrypt');

const setNewPassword=async(activationcode,newPassword)=>{
  console.log(newPassword)
  let db=new database()
  let res=await db.executeQuery(`select * from users where activation_code=?`,[activationcode])
  if(typeof(res)=="string")
  {
      return({
        msg:'something is wrong please restart application',
        flag:false
      })
  }
  if(res.length==0)
  {
      return({
        msg:'user Not Exists',
        flag:false
      })
  }
  let user=res[0]
  let result=await db.executeQuery("select * from user_passwords where user_id=? order by create_at desc limit 2",[user.id])
  if(typeof(result)=="string")
  {
    return{
      flag:false,
      msg:'Something is Wrong Account Not Activated'
    }
  }
  else if(result.length>0)
  {
    result=result.map(item=>bcrypt.compareSync(newPassword,item.password));
    if(result.indexOf(true)>=0)
    {
      return{
        flag:false,
        msg:"Password is already use...."
      }
    }
    
  }
  const diff = (new Date()-new Date(user.create_at))/1000
  // console.log(diff)
  // console.log(diff<process.env.ACTIVATION_TIME_TO_ACTIVATE)
  // console.log(process.env.ACTIVATION_TIME_TO_ACTIVATE)
  if(diff<process.env.ACTIVATION_TIME_TO_ACTIVATE){
      const salt=bcrypt.genSaltSync(parseInt(process.env.SALT_ROUND));
      newPassword=bcrypt.hashSync(newPassword,salt);
      console.log(newPassword)
      pass={
        user_id:user.id,
        password:newPassword
      }
      result=await db.insertData(pass,"user_passwords")
      result=await db.updateAnd({status:1},"users",{id:user.id})
      // console.log(result)
      if(typeof(result)=="string")
      {
        return{
          flag:false,
          msg:"Account is Not Activated"
        }
      }
      else if(result.affectedRows>0)
      {
        return{
          flag:true,
          msg:"Set Password Successfull...",
          source:"1"
        }
      }
  }
  else
  { 
    return{
      flag:false,
      msg:"Activation Link Expires"
    }
  }
}

module.exports=setNewPassword;