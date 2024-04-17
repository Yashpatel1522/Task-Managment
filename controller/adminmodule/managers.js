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
        let managerData = await db.executeQuery(`select users.* from users left join roles on users.role_id = roles.id where role_name = ? and users.status = ?`, ["Manager", "1"]);
        return response.json({ result: managerData });
    } catch (error) {
        logger.error("Manager data is not found !");
    }
}

exports.managerDetails = async (request, response) => {
    try {
        let managerId = request.params.id;
        let managerDetail = await db.executeQuery(`select users.* from users left join roles on users.role_id = roles.id where role_name = ? and users.id = ?`, ["Manager", managerId]);
        return response.json({ managerDetail });
    } catch (error) {
        logger.error("Manager data is not found !");
    }
}

exports.searchManData = async (request, response) => {
    try {
        let search = "%" + request.params.searchdata + "%";
        let searchData = await db.executeQuery(`select users.* from users left join roles on users.role_id = roles.id where role_name = ? and (first_name like ? or last_name like ?)`, ["Manager", search, search]);
        return response.json({ searchData });
    } catch (error) {
        logger.error("Not Search Data Found !");
    }
}

exports.dataDelete = async (request, response) => {
    try {
        let id = request.params.id;
        let deletedata = await db.updateOr({ status: "0" }, "users", { id: id });
        return response.json({ deletedata });
    } catch (error) {
        logger.error("Manager Data Can't deleted !");
    }
}