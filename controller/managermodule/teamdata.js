const { request, response } = require("express");
const database = require("../../helpers/database.helper");
const logger = require("../../logger/logger");
var db = new database();

exports.teamdetails = async (request, response) => {
  try {
    let teamData = await db.executeQuery(
      `select * from teams where created_by = ? and is_active = ?`,
      [request.user.id, "1"]
    );
    console.log(teamData);
    return response.json({ result: teamData });
  } catch (error) {
    logger.error("Team details not found!");
  }
};

exports.showTeamDataForUpdate = async (request, response) => {
  try {
    let id = request.params.id;
    let teamData = await db.executeQuery(
      `select teams.team_name,team_members.emp_id,users.first_name from teams left join team_members on teams.id = team_members.team_id left join users on team_members.emp_id = users.id where teams.id = ? and team_members.is_deleted = 0`,
      [id]
    );
    return response.json({ teamData });
  } catch (error) {
    logger.error(error);
  }
};

exports.updateTeamData = async (request, response) => {
  try {
    let teamdata = request.body;
    await db.updateAnd({ team_name: teamdata.team_name }, "teams", {
      id: teamdata.id,
    });
    let teamMember = [];
    let emp_id_data = await db.executeQuery(
      `select * from team_members where team_id = ? and is_deleted = 0`,
      [teamdata.id]
    );
    for (let j = 0; j < teamdata.employe.length; j++) {
      for (let i = 0; i < emp_id_data.length; i++) {
        if (teamdata.employe[j] != emp_id_data[i].emp_id) {
          await db.updateAnd({ is_deleted: "1" }, "team_members", {
            team_id: teamdata.id,
            emp_id: emp_id_data[i].emp_id,
          });
          if (!teamMember.includes(teamdata.employe[j])) {
            await teamMember.push(teamdata.employe[j]);
          }
        } else {
          await db.updateAnd({ emp_id: teamdata.employe[j] }, "team_members", {
            team_id: teamdata.id,
          });
        }
      }
    }
    await teamMember.forEach((element) => {
      db.insertData({ team_id: teamdata.id, emp_id: element }, "team_members");
    });

    return response.json({ msg: "done" });
  } catch (error) {
    logger.error(error);
  }
};

exports.teamDetailsForView = async (request, response) => {
  try {
    let teamId = request.params.id;
    let teamCreate = await db.executeQuery(
      `select t.id,t.team_name, concat(u.first_name ,' ', u.last_name) as created_by from teams as t left join users as u on t.created_by = u.id where t.id = ?`,
      [teamId]
    );
    let memberDetails = await db.executeQuery(
      `select t.id,t.team_id,concat(u.first_name ,' ', u.last_name) as employees  from team_members as t left join teams on t.team_id = teams.id left join users as u on t.emp_id = u.id where t.team_id = ? and is_deleted = ?`,
      [teamId, 0]
    );
    let teamTask = await db.executeQuery(
      `select h.team_id,t.task_name from team_has_tasks as h left join tasks as t on h.task_id = t.id where h.team_id = ?`,
      [teamId]
    );
    return response.json({
      teamCreate: teamCreate,
      memberDetails: memberDetails,
      teamTask: teamTask,
    });
  } catch (error) {
    logger.error("Team details is not found it!");
  }
};

exports.deleteTeam = async (request, response) => {
  try {
    let deletedata = await db.updateOr({ is_active: "0" }, "teams", {
      id: request.params.id,
    });
    let deleteteammember = await db.updateOr(
      { is_deleted: "1" },
      "team_members",
      { team_id: request.params.id }
    );
    return response.json({ deletedata, deleteteammember });
  } catch (error) {
    logger.error("Team Data Can't deleted !");
  }
};
