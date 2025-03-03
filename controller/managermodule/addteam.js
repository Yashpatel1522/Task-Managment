const database = require("../../helpers/database.helper");
const logger = require("../../logger/logger");
let db = new database();

const getempdata = async (request, response) => {
  try {
    const query = `select id,first_name from users where role_id = ? and status = ?`;
    let empdata = await db.executeQuery(query, [3, 1]);
    return response.json(empdata);
  } catch (error) {
    logger.error(error);
  }
};

const addteam = async (request, response) => {
  try {
    let teamdata = request.body;
    let createdBy = request.user.id;
    let lastInserted_id;
    let res = await db.insertData(
      { created_by: createdBy, team_name: teamdata.team_name },
      "teams"
    );
    lastInserted_id = res.insertId;
    await teamdata.employe.forEach((emp) => {
      db.insertData({ team_id: lastInserted_id, emp_id: emp }, " team_members");
    });
    return response.json({ msg: "done" });
  } catch (error) {
    logger.error(error);
  }
};
module.exports = { getempdata, addteam };
