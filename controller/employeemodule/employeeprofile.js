const database = require("../../helpers/database.helper")

const getProfiledata =  async (request,response) => {
    try {
        let employeeProfileQuery = `select * from users where id=1`
        const db =new database();
        let res = await db.executeQuery(employeeProfileQuery)
        return response.json({result:res})
    } catch (error) {
        return response.send(error)
    }
}

module.exports = {getProfiledata}