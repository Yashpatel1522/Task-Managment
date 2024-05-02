const database = require("../../helpers/database.helper");
const logger = require("../../logger/logger");
var db = new database();

exports.managerpage = (request, response) => {
    try {
        response.render('./adminmodule/managers')
    } catch (error) {
        logger.error("Manager page not render")
    }
}


exports.adminManagers = async (request, response) => {
    try {
        let managerData = await db.executeQuery(`select users.* from users left join roles on users.role_id = roles.id where role_name = ? and users.status = ?`, ["Manager", 1]);
        return response.json({ result: managerData });
    } catch (error) {
        logger.error("Manager data is not found !");
    }
}

exports.managerDetails = async (request, response) => {
    try {
        let managerId = request.params.id;
        let managerDetail = await db.executeQuery(`select users.* from users left join roles on users.role_id = roles.id where role_name = ? and users.id = ? and users.status = ?`, ["Manager", managerId, 1]);
        let managerTask = await db.executeQuery(`select u.id, u.first_name, t.task_name, t.manager_id from users as u inner join tasks as t on u.id = t.manager_id where t.manager_id = ? and role_id = ?`, [managerId, 2])
        return response.json({ result: managerDetail, result2: managerTask });
    } catch (error) {
        logger.error("Manager data is not found !");
    }
}

exports.searchManData = async (request, response) => {
    try {
        let search = "%" + request.params.searchdata + "%";
        let searchData = await db.executeQuery(`select users.* from users left join roles on users.role_id = roles.id where role_name = ? and (first_name like ? or last_name like ?) and users.status = ?`, ["Manager", search, search, 1]);
        return response.json({ result: searchData });
    } catch (error) {
        logger.error("Not Search Data Found !");
    }
}

exports.dataDelete = async (request, response) => {
    try {
        let deletedata = await db.updateOr({ status: "0" }, "users", { id: request.params.id });
        return response.json({ deletedata });
    } catch (error) {
        logger.error("Manager Data Can't deleted !");
    }
}