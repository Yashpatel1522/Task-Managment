
const database = require("../../helpers/database.helper");
const logger = require("../../logger/logger")

const getempdata = async(request,response) => {
  try {
    let db = new database();
    const query = `select id,first_name from users where role_id = 1`;
    let empdata =await db.executeQuery(query);
    return response.json(empdata);

  } catch (error) {
    logger.error(error)
  }
}

const addteam = async(request,response)=>{
  try {
    let teamdata = request.body;
    let lastInserted_id;
    let db = new database();
    let res = await db.insertData({manager_id:1,team_name:teamdata.team_name},"teams")
    lastInserted_id = res.insertId;
    await teamdata.employe.forEach(emp => {
      db.insertData({team_id:lastInserted_id,emp_id:emp}," team_members")
    });
    return response.json({'msg':'done'});
  } catch (error) {
    logger.error(error);
  }

}
module.exports = {getempdata,addteam}