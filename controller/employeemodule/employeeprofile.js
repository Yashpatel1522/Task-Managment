const database = require("../../helpers/database.helper")

const getProfiledata =  async (request,response) => {
    try {
        let employeeProfileQuery = `select * from users where id=1`
        const db =new database();
        let res = await db.executeQuery(employeeProfileQuery)
        return response.json({result:res})
    } catch (error) {
        return response.send({'error':error})
    }
}
const updateProfiledata = async (request,response) => {
    try {
        let first_name = request.body.first_name
        let last_name = request.body.last_name
        let email = request.body.email
        let contact = request.body.contact
        let date_of_birth = request.body.date_of_birth
        let role = request.body.Role
        let updateProfiledataQuery = `UPDATE users SET first_name='${first_name}', last_name='${last_name}',email='${email}', contact='${contact}', date_of_birth='${date_of_birth}', employee_role='${role}'`
        const db = new database()
        let res = await db.executeQuery(updateProfiledataQuery)
        return response.json({result:res})
    } catch (error) {
        return response.send({'error':error})
    }
}
module.exports = {getProfiledata,updateProfiledata}