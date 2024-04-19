const { request } = require("express");
const database = require("../../helpers/database.helper");
const logger = require("../../logger/logger")
let db=new database();

const employeeData = async (request,response) => {
    try{
        let query = `select * from users where role_id = ? and status = ?`;
        let res=await db.executeQuery(query,[3,1]); 
        return response.json({result:res})
    }
    catch(error){
        logger.log(error);
        return response.send({'error': error})
    }

}

const searchEmpData = async (request, response) => {
    try {
        let search = "%" + request.params.searchdata + "%";
        let searchData = await db.executeQuery(`select * from users left join roles on users.role_id = roles.id where role_name = ? and (first_name like ? or last_name like ?) `, ["Employee", search, search]);
        return response.json({ searchData });
    } catch (error) {
        logger.error("Not Search Data Found !")
    }
}

const removeEmployee = async(request,response)=>{
     try {
        let deletedata = await db.updateOr({ status: "0" }, "users", { id: request.params.id });
        return response.json({ deletedata });
     } catch (error) {
        logger.error("Remove employee successfully");
     }
}


module.exports = {employeeData,searchEmpData,removeEmployee};