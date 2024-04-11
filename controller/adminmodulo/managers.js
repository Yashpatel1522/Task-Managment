// const getConnection = require("../../config/connection");
const database = require("../../helpers/database.helper");
const logger = require("../../logger/logger");

exports.adminManagers = async (request, response) => {
    try {
        let pageno = request.query.p || 1;
        let limit = 10;
        let offset = (Number(pageno) - 1) * limit;
        let db = new database()
        let query = `select users.id,first_name, last_name, email, contact from users left join roles on users.role_id = roles.id where role_name = ? `;
        let result = await db.executeQuery(query, ["Manager"]);
        let page = Math.ceil(result.length / limit);
        let managerData = result.slice(offset, offset + limit);
        response.render("adminmodulo/managers", { managerData, pageno,page});
    } catch (err) {
        // logger.error(err);
        console.log(err);
    }
}