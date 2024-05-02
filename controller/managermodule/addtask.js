const { request } = require("express");
const database = require("../../helpers/database.helper");
const logger = require("../../logger/logger");
let db = new database();

const addtaskdata = async (request, response) => {
  try {
    let dataobj = {};
    const query = `select id,concat(first_name, ' ', last_name) as first_name from users where role_id = 3 and status = 1`;
    const teamDataQuery = `select id,team_name from teams where is_active = 1`;
    const categoryDataQuery = `select * from categories where status = 1`;
    const urgencyDataQuery = "select * from urgency";
    const importancyDataQuery = "select * from importants";
    let empdata = await db.executeQuery(query);
    let teamdata = await db.executeQuery(teamDataQuery);
    let categorydata = await db.executeQuery(categoryDataQuery);
    let urgencyData = await db.executeQuery(urgencyDataQuery);
    let importancyData = await db.executeQuery(importancyDataQuery);
    dataobj.empdata = empdata;
    dataobj.teamdata = teamdata;
    dataobj.categorydata = categorydata;
    dataobj.urgencyData = urgencyData;
    dataobj.importancyData = importancyData;
    response.json(dataobj);
  } catch (err) {
    logger.error(err);
  }
};

const inserttaskdata = async (request, response) => {
  try {
    let taskdata = request.body;
    let managerId = request.user?.id;
    let lastInserted_id;

    let priorityData = await db.executeQuery(
      `select id from priorities where urgency_id = ? and important_id = ?`,
      [taskdata.urgency_level, taskdata.impotant_level]
    );
    let res = await db.insertData(
      {
        manager_id: managerId,
        category_id: taskdata.task_category,
        prioritiy_id: priorityData[0].id,
        task_name: taskdata.task_name,
        task_description: taskdata.task_description,
        task_start_date: taskdata.task_start_date,
        task_end_date: taskdata.task_end_date,
        task_status: taskdata.task_status,
      },
      "tasks"
    );
    lastInserted_id = res.insertId;

    let AssinTaskTo = taskdata.Assin_task_to.split(",");
    await AssinTaskTo.forEach((element) => {
      if (element) {
        db.insertData(
          { task_id: lastInserted_id, emp_id: element },
          "tasks_assigend_to"
        );
      }
    });
    let AssinTaskToTeam = taskdata.Assin_task_to_team.split(",");
    let empOfTeam;
    await AssinTaskToTeam.forEach((team) => {
      if (team != 0) {
        db.insertData(
          { task_id: lastInserted_id, team_id: team },
          "team_has_tasks"
        );
        let queryt = `select emp_id from team_members where team_id = ${team} and is_deleted = 0`;
        empOfTeam = db.executeQuery(queryt);
      }
    });

    await request.files.forEach((file) => {
      let filedata = {
        task_id: lastInserted_id,
        oldfile_name: file.originalname,
        newfile_name: file.filename,
      };
      filedata = db.insertData(filedata, "attechments");
    });

    response.json({
      msg: "done",
      managerId: managerId,
      taskName: taskdata.task_name,
      empOfTeam: await empOfTeam,
    });
  } catch (error) {
    logger.error(error);
  }
};

module.exports = { addtaskdata, inserttaskdata };
