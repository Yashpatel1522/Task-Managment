const { request, response } = require("express");
const database = require("../../helpers/database.helper");
const logger = require("../../logger/logger");
var db = new database()

exports.teamdetails = async (request, response) => {
  try {
      let teamData = await db.executeQuery(`select * from teams where is_active = ?`, ["1"]);
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

exports.showTeamDataForUpdate = async(request,response)=>{
  try {
    let id = request.params.id
    let teamData = await db.executeQuery(`select teams.team_name,team_members.emp_id,users.first_name from teams left join team_members on teams.id = team_members.team_id left join users on team_members.emp_id = users.id where teams.id = ? and team_members.is_deleted = 0`,[id]);
    return response.json({teamData})
  } catch (error) {
    logger.error(error);
  }
}

exports.updateTeamData = async(request,response)=>{
  try {
    let teamdata = request.body;
    await db.updateAnd({team_name:teamdata.team_name},"teams",{id:teamdata.id})
    let emp_id_data = await db.executeQuery(`select emp_id from team_members where team_id = ? and is_deleted = 0`,[teamdata.id]); 
      for(let j=0;j<teamdata.employe.length;j++){
        for(let i=0;i<emp_id_data.length;i++){
          console.log(emp_id_data[i].emp_id,teamdata.employe[j]);
          if(teamdata.employe[j] != emp_id_data[i].emp_id){
            await db.updateAnd({is_deleted:1},"team_members",{id:teamdata.id,emp_id:emp_id_data[i].emp_id})
            // await db.insertData({team_id:teamdata.id,emp_id:teamdata.employe[j]},"team_members")
          }
      }
    }
    
    return response.json({'msg':'done'});
  } catch (error) {
    logger.error(error)
  }
}