const database = require("../../helpers/database.helper");
const logger = require("../../logger/logger");


exports.adminEmployees = async(request,response) => {
    try {
        let pageno = request.query.p || 1;
        let limit = 6;
        let offset = (Number(pageno) - 1) * limit;
        let db = new database();
        let query = `select u.first_name,u.last_name,u.email,u.contact from users as u 
        left join roles as r on u.role_id = r.id where role_name=?`;
        let result = await db.executeQuery(query,["Employee"]); 
        let page = Math.ceil(result.length / limit);
        let employeeData = result.slice(offset, offset + limit);
        response.render("adminmodulo/employees", { employeeData, pageno,page});
    } catch (err) {
        console.log(err);
        // logger.error(err);
    }
}