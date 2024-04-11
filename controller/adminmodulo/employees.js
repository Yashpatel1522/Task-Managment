const database = require("../../helpers/database.helper");
const logger = require("../../logger/logger");


exports.adminEmployees = async(request,response) => {
    try {
        let db = new database();
        let query = `select u.first_name,u.last_name,u.email,u.contact from users as u 
        left join roles as r on u.role_id = r.id where role_name=?`;
        let employeeData = await db.executeQuery(query,["Employee"]); 
        response.render("adminmodulo/employees",{employeeData})
    } catch (err) {
        console.log(err);
        // logger.error(err);
    }
}