const database = require("../../helpers/database.helper")


const registrationGet=(req,res)=>{
    res.render("loginmodule/registration.ejs")
}

const registrationPost=async(request,response)=>{
    console.log(request.body) 
    let registrationdata={
        role_id:request.body.role_id,
        first_name:request.body.first_name,
        last_name:request.body.last_name,
        email:request.body.email,
        contact:request.body.contact,
        date_of_birth:request.body.date_of_birth,
        employee_role:request.body.employee_role
    }   
    let db=new database()
    let res=await db.insertData(registrationdata,"users")
    console.log(request.file)
    let file=request.file
    let userprofiledata={
        "user_id":res.insertId,
        "oldimage_name":file.originalname,
        "newimage_name":file.filename,
        "path":file.path
    }
    res=await db.insertData(userprofiledata,"user_profiles")
    console.log(res)
}

const dashboardGet=(req,res)=>{
    res.render("loginmodule/dashboard.ejs")
}

module.exports={registrationGet,dashboardGet,registrationPost};