const { syslog } = require("winston/lib/winston/config");
const database = require("../../helpers/database.helper")
const logger = require("../../logger/logger");
const db = new database();

// module.exports={UserTaskList}

const teamlist = async (req, res) => {
  res.render('employeemodule/emplyeeteam')

}

const teamdata = async (req, res) => {
  try {
    id = req.params.id
    const query = `select teams.id as teamid,teams.team_name,users.first_name as employee_name from team_details inner join teams on teams.id=team_details.team_id inner join users on users.id=team_details.member_id where users.id=?` 
    let result = await db.executeQuery(query, id)
    res.json(result)
  }
  catch (error) {
    logger.error("Employee Task data is not found !");
  }
}

const teamdetails = async (req, res) => {
  try {
    id = req.params.id
    const query1 = `select distinct(teams.team_name),users.first_name as manager_name from team_details inner join teams on teams.id=team_details.team_id inner join users on users.id=teams.created_by where teams.id=?;`
    let result1 = await db.executeQuery(query1, id)
    const query2 = `select teams.team_name,users.first_name as employee_name from team_details inner join teams on teams.id=team_details.team_id inner join users on users.id=team_details.member_id where teams.id=?;`
    let result2 = await db.executeQuery(query2, id)

    const responsedata = {
      result1: result1,
      result2: result2
    }
    res.json(responsedata)
  }
  catch (error) {
    logger.error(error)
  }
}

module.exports = { teamlist, teamdata, teamdetails }