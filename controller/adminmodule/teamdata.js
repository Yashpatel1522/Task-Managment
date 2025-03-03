const database = require("../../helpers/database.helper");
const logger = require("../../logger/logger");
var db = new database()

exports.adminTeam = (request, response) => {
    try {
        response.render("adminmodule/teamdata")
    } catch (err) {
        logger.error("Team data not found!");
    }
}

exports.addNewTeam = async (request, response) => {
    try {
        let { team_name, member_id } = request.body;
        let team_is_exit = await db.executeQuery("select * from teams where team_name = ? and is_active = ?", [team_name, 1]);
        if (team_is_exit.length === 0) {
            let teamadd = await db.insertData({ team_name: team_name, created_by: 1 }, "teams");
            let lastid = teamadd.insertId;
            member_id.split(",").forEach(async (element) => {
                await db.insertData({ team_id: lastid, emp_id: element }, "team_members");
            });

            return response.json({ status: 200, msg: "New Team Insert Succefully" })
        } else {
            return response.json({ status: 500, msg: "Team Name Is Already Exists" })
        }

    } catch (error) {
        logger.error("New team is not added !")
    }
}

exports.teamData = async (request, response) => {
    try {
        let teamData = await db.executeQuery(`select * from teams where is_active = ?`, [1]);
        return response.json({ result: teamData });
    } catch (error) {
        logger.error("Team details not found it!");
    }
}

exports.teamDetails = async (request, response) => {
    try {
        let teamId = request.params.id;
        let teamCreate = await db.executeQuery(`select t.id,t.team_name, concat(u.first_name ,' ', u.last_name) as created_by from teams as t left join users as u on t.created_by = u.id where t.id = ?`, [teamId]);

        let memberDetails = await db.executeQuery(`select t.id ,t.team_id , u.id as emp_id ,concat(u.first_name ,' ', u.last_name) as employees from team_members as t left join teams on t.team_id = teams.id left join users as u on t.emp_id = u.id where t.team_id = ? and is_deleted = ?`, [teamId, 0]);

        let teamTask = await db.executeQuery(`select h.team_id,t.task_name from team_has_tasks as h left join tasks as t on h.task_id = t.id where h.team_id = ?`, [teamId]);

        let notSelectedEmp = await db.executeQuery(`SELECT users.id, users.role_id, users.first_name, users.last_name FROM users WHERE role_id = ? and users.status= ? and users.id NOT IN (SELECT emp_id FROM team_members where team_id = ?  and is_deleted = ? );`, [3, 1, teamId, 0]);

        return response.json({ teamCreate: teamCreate, memberDetails: memberDetails, teamTask: teamTask, notSelectedEmp: notSelectedEmp })
    } catch (error) {
        logger.error("Team details is not found it!");
    }
}

exports.updateTeamData = async (request, response) => {
    try {
        let team_id = request.params.id;
        let { team_name, member_id } = request.body;
        await db.updateAnd({ team_name: team_name }, "teams", { id: team_id });
        await db.updateAnd({ is_deleted: 1 }, "team_members", { team_id: team_id });
        member_id.split(",").forEach(async (element) => {
            await db.insertData({ team_id: team_id, emp_id: element }, "team_members");
        });
        return response.json({ status: 200, msg: " Team Update Succefully" })
    } catch (error) {
        logger.error("Team Not Update !")
        return response.json({ status: 500, msg: "Team Name Is Already Exists" })
    }
}

exports.searchTeam = async (request, response) => {
    try {
        let search = "%" + request.params.searchdata + "%";
        let searchTeam = await db.executeQuery(`select * from teams where team_name like ? and is_active = ? `, [search, 1]);
        return response.json({ result: searchTeam });
    } catch (error) {
        logger.error("Team data not found it!");
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