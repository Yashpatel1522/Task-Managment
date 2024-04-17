const database = require("../../helpers/database.helper");
const logger = require("../../logger/logger");

const profiledata = async (request, response) => {
    try {
        let profileQuery = `select * from users as u inner join roles as r on u.role_id = r.id where r.role_name = ?`;
        const db = new database();
        let [res] = await db.executeQuery(profileQuery, ["Admin"])
        // console.log(res);
        return response.json({ result: res })
    } catch (error) {
        logger.error("Data is not found !")
    }
}

module.exports = { profiledata }