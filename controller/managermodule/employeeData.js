const database = require("../../helpers/database.helper");
const logger = require("../../logger/logger")
let db=new database();

const employeeData = async (request,response) => {
    try{
        let q = `select * from users where role_id = 3 and status = 1;`;
        let res=await db.executeQuery(q); 
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
        console.log(searchData);
        return response.json({ searchData });
    } catch (error) {
        logger.error("Not Search Data Found !")
    }
}


module.exports = {employeeData,searchEmpData};