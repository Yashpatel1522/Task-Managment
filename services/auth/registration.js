const database = require("../../helpers/database.helper")
const fs = require('fs'); 
const randomNumberGenrater = require("./randomNumberGenrater");

const addUser=async(user,userprofile)=>{
  let db=new database()
    let userexists=await db.executeQuery("select * from users where email=?",[user.email])
    // console.log(userexists)
    if(userexists.length==0)
    {
        let activationkey=randomNumberGenrater(8)
        let registrationdata={
            role_id:user.role_id,
            first_name:user.first_name,
            last_name:user.last_name,
            email:user.email,
            contact:user.contact,
            date_of_birth:user.date_of_birth,
            employee_role:user.employee_role,
            activation_code:activationkey
        }   
        let res=await db.insertData(registrationdata,"users")
        let file=userprofile
        let userprofiledata={
            "user_id":res.insertId,
            "oldimage_name":file.originalname,
            "newimage_name":file.filename,
        }
        res=await db.insertData(userprofiledata,"user_profiles")
        return{
          msg:"activationkey",
          activationkey:activationkey,
          flag:true
        }
    }
    else if(userexists.length>0 && userexists[0].status==0)
    {
      let activationkey=randomNumberGenrater(8)
      let registrationdata={
          role_id:user.role_id,
          first_name:user.first_name,
          last_name:user.last_name,
          email:user.email,
          contact:user.contact,
          date_of_birth:user.date_of_birth,
          employee_role:user.employee_role,
          activation_code:activationkey
      }   
      let res=await db.updateAnd(registrationdata,"users",{id:userexists[0].id})
      let file=userprofile
      let userprofiledata={
          "oldimage_name":file.originalname,
          "newimage_name":file.filename,
      }
      res=await db.updateAnd(userprofiledata,"user_profiles",{'user_id':userexists[0].id,'is_deleted':0})
      return{
        msg:"activationkey",
        activationkey:activationkey,
        flag:true
      }
    }
    else
    {
        fs.unlinkSync(userprofile.path); 
        return({
            msg:"User Already Exists",
            flag:false
        })
    }
}
module.exports=addUser