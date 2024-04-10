const database = require("../../helpers/database.helper");
const logger = require("../../logger/logger");


let db = new database()
exports.adminemployees = async(request,response) => {
    try {
        let query = `select u.first_name,u.last_name,u.email,u.contact,u.date_of_birth from users as u left join roles as r 
        on u.role_id = r.id where r.role_name="Employee";`
        let result = await db.executeQuery(query);
        let key = Object.keys(result[0]);
        console.log(result);
        console.log(key);
        response.render("adminmodulo/employees",{result,key})
    } catch (err) {
        logger.error(err);
    }
}