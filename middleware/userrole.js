const database = require("../helpers/database.helper");

const checkUserRole=async(request,response,next)=>{
    let user=request.user
    let db=new database()
    let res=await db.executeQuery("select * from role_has_permissions as table1 left join permissions as table2 on table1.permission_id=table2.id where table1.role_id=? and table1.status=? and api = ? and type=?",[user.role_id,1,request.originalUrl,request.method.toLowerCase()])
    console.log(res)
    if(res.length>0)
    {
        next()
    }
    else
    {
        response.redirect("/login/")
    }
}

module.exports=checkUserRole;
