// const getConnection = require("../../config/connection");
const database = require("../../helpers/database.helper");
const logger = require("../../logger/logger");

exports.adminManagers = async (request, response) => {
    try {
        let db = new database()
        let query = `select users.* from users left join roles on users.role_id = roles.id where role_name = ? `;
        let managerData = await db.executeQuery(query, ["Manager"]);
        return response.json({result:managerData})
    } catch (error) {
        // logger.error(err);
        console.log(error);
    }
}

exports.managerDetails = async (request,response) => {
    try {
        let managerId = request.params.id;
        let db = new database()
        let query = `select users.* from users left join roles on users.role_id = roles.id where users.id = ?`
        let managerDetail = await db.executeQuery(query, [managerId]);
        return response.json({managerDetail}) 
    } catch (error) {
        logger.log(error)
    }
}