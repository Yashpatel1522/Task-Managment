const database = require("../../helpers/database.helper");
const logger = require("../../logger/logger");
var db = new database()

exports.teamdetails = async (request, response) => {
  try {
      let teamData = await db.executeQuery(`select * from teams`);
      return response.json({ result: teamData });
  } catch (error) {
      logger.error("Team details not found!")
  }
}
exports.searchTeamData = async (request, response) => {
  try {
    let search = "%" + request.params.searchdata + "%";
    let searchData = await db.executeQuery(`select * from teams where created_by = ? and (team_name like ?)`,[1,search]);
    return response.json({ searchData });
  } catch (error) {
      logger.error("Not Search Data Found !")
  }
}