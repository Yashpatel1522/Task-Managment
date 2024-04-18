
const { request } = require("http");
const database = require("../../helpers/database.helper");
const logger = require("../../logger/logger");
const { response } = require("express");
var db = new database()

exports.adminTeam = (request, response) => {
    try {
        response.render("adminmodule/teamdata")
    } catch (err) {
        logger.error("Team data not found!");
    }
}

exports.teamData = async (request, response) => {
    try {
        let teamData = await db.executeQuery(`select * from teams where is_active = ?`, ["1"]);
        return response.json({ result: teamData });
    } catch (error) {
        logger.error("Team details not found it!")
    }
}

exports.teamDetails = async (request, response) => {
    try {
        let teamId = request.params.id;
        let teamCreate = await db.executeQuery(`select t.id,t.team_name, concat(u.first_name ,' ', u.last_name) as created_by from teams as t left join users as u on t.created_by = u.id where t.id = ?`, [teamId]);

        let memberDetails = await db.executeQuery(`select t.detail_id,t.team_id,concat(u.first_name ,' ', u.last_name) as employees  from team_details as t left join teams on t.team_id = teams.id left join users as u on t.member_id = u.id where t.team_id = ?`, [teamId]);

        let teamTask = await db.executeQuery(`select h.id,h.team_id,t.task_name from team_has_tasks as h left join tasks as t on h.task_id = t.id where h.team_id = ?`, [teamId]);

        return response.json({ teamCreate: teamCreate, memberDetails: memberDetails, teamTask: teamTask })
    } catch (error) {
        logger.error("Team details is not found it!");
    }
}

exports.deleteTeam = async (request, response) => {
    try {
        let deletedata = await db.updateOr({ is_active: "0" }, "teams", { id: request.params.id });
        return response.json({ deletedata });
    } catch (error) {
        logger.error("Manager Data Can't deleted !");
    }
}