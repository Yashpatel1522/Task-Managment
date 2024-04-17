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
        let query = `select users.* from users left join roles on users.role_id = roles.id where role_name = ? and users.id = ?`
        let managerDetail = await db.executeQuery(query, ["Manager", managerId]);
        return response.json({managerDetail}) 
    } catch (error) {
        logger.log(error)
    }
}

exports.searchManData = async (request,response) => {
    try {
        let search = request.params.searchdata;
        search = "%" + search + "%";    
        let db = new database()
        let query = `select users.* from users left join roles on users.role_id = roles.id where role_name = ? and (first_name like ? or last_name like ?) `
        let searchData = await db.executeQuery(query, ["Manager",search,search]);
        return response.json({searchData}) 
    } catch (error) {
        logger.log(error);
    }
}

exports.dataDelete = async (request,response) => {
    try {
        let id = request.params.id
        let db = new database();
        let deletedata = await db.delete("users", {id});
        return response.json({deletedata})
    } catch (error) {
        console.log(error);
        logger.error(error);
    }
}