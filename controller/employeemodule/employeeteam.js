const { syslog } = require("winston/lib/winston/config");
const database = require("../../helpers/database.helper");
const logger = require("../../logger/logger");
const db = new database();

// module.exports={UserTaskList}

const teamlist = async (req, res) => {
  try {
    res.render("employeemodule/emplyeeteam");
  } catch (err) {
    logger.error("Employee Task data is not found !");
  }
};

const teamdata = async (req, res) => {
  try {
    id = req.params.id
    const query = `select t.id,t.team_name,u.first_name,m.emp_id from teams as t 
inner join team_members as m on t.id = m.team_id 
inner join users as u on t.created_by = u.id
where (t.is_active = 1 and m.is_deleted = 0 and m.emp_id = ?)`
    let result = await db.executeQuery(query, [3])
    res.json(result)
  }
  catch (error) {
    logger.error("Employee Task data is not found !");
  }
};

const teamdetails = async (req, res) => {
  try {
    id = req.params.id;
    // id = 1
    const query1 = `select distinct(teams.team_name),users.first_name as manager_name from team_members 
                    inner join teams on teams.id=team_members.team_id
                    inner join users on users.id=teams.created_by 
                    where teams.id=?;`
    let result1 = await db.executeQuery(query1, id);
    const query2 = `select tasks.task_name,teams.team_name,users.first_name as employee_name from team_members 
                    inner join teams on teams.id=team_members.team_id 
                    inner join users on users.id=team_members.emp_id inner join team_has_tasks as tht on tht.team_id =teams.id inner join tasks on tasks.id=tht.task_id where teams.id=?;`
    let result2 = await db.executeQuery(query2, id);

    const responsedata = {
      result1: result1,
      result2: result2,
    };
    res.json(responsedata);
  } catch (error) {
    logger.error(error);
  }
};

const teamsearchdetails = async (req, res) => {
  try {
    let search = "%" + req.params.searchteam + "%";
    let searchTeam = await db.executeQuery(
      `select * from teams where team_name like ? `,
      [search]
    );
    return res.json(searchTeam);
  } catch (error) {
    logger.error("Team data not found it!");
  }
};

module.exports = { teamlist, teamdata, teamdetails, teamsearchdetails };
