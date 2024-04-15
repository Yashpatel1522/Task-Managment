const { request } = require("http");
const database = require("../../helpers/database.helper");
const logger = require("../../logger/logger");
const { response } = require("express");


exports.adminEmployees = async (request, response) => {
    try {
        let pageno = request.query.p || 1;
        let limit = 6;
        let offset = (Number(pageno) - 1) * limit;
        let db = new database();
        let query = `select u.id, u.first_name,u.last_name,u.email,u.contact from users as u left join roles as r on u.role_id = r.id where role_name=?`;
        let employeeData = await db.executeQuery(query, ["Employee"]);
        return response.json({result:employeeData});
    } catch (err) {
        console.log(err);
        // logger.error(err);
    }
}

exports.employeeDetails = async (request,response) => {
    try {
        let employeeId = request.params.id;
        let db = new database()
        let query = `select users.* from users left join roles on users.role_id = roles.id where role_name = "Employee" and users.id = ?`
        let employeeDetail = await db.executeQuery(query, [employeeId]);
        return response.json({employeeDetail}) 
    } catch (error) {
        logger.error(error)
        console.log(error);
    }
}

exports.searchEmpData = async (request,response) => {
    try {
        let search = request.params.searchdata;
        search = "%" + search + "%";
        let db = new database();
        let query = `select users.* from users left join roles on users.role_id = roles.id where role_name = ? and first_name like ? or last_name like ? `
        let searchData = await db.executeQuery(query, ["Employee",search, search]);
        return response.json({searchData}) 
    } catch (error) {
        logger.error(error)
    }
}

exports.empDataDelete = async (request, response) => {
    try {
        let id = request.params.id
        let db = new database();
        let deletedata = await db.delete("users", {id});
        return response.json({deletedata})
    } catch (error) {
        logger.error(error);
    }
}