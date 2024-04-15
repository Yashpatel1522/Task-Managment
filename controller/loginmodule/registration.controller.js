

const registrationGet=(req,res)=>{
    res.render("loginmodule/registration.ejs")
}


const dashboardGet=(req,res)=>{
    res.render("loginmodule/dashboard.ejs")
}

module.exports={registrationGet,dashboardGet};