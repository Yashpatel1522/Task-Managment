

const registrationGet=(req,res)=>{
    res.render("loginmodule/registration.ejs")
}

const registrationPost=(request,response)=>{
    console.log(request.body)    
}

const dashboardGet=(req,res)=>{
    res.render("loginmodule/dashboard.ejs")
}

module.exports={registrationGet,dashboardGet,registrationPost};