// const getConnection = require("../../config/connection");
const database = require("../../helpers/database.helper");
const logger = require("../../logger/logger");

exports.adminManagers = async (request,response) => {
    try {
        let  db =new database()
        let query = `select first_name, last_name, email, contact, roles.role_name from users left join roles on users.role_id = roles.id where role_name = "Manager";`
        let result = await db.executeQuery(query);
        console.log(result);
        response.render("adminmodulo/managers",{result});
    } catch (err) {
        // logger.error(err);
        console.log(err);
    }
}