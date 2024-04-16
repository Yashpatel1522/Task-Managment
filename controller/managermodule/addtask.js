const database = require("../../helpers/database.helper");
const logger = require("../../logger/logger");




const addtaskdata= async(request,response) => {
  try {
    let dataobj = {};
    let db = new database();
    const query = `select id,first_name from users where role_id = 1`;
    const categoryDataQuery = `select * from categories`;
    const urgencyDataQuery = 'select * from urgency';
    const importancyDataQuery = 'select * from importants';
    let empdata =await db.executeQuery(query);
    let categorydata = await db.executeQuery(categoryDataQuery);
    let urgencyData = await db.executeQuery(urgencyDataQuery);
    let importancyData = await db.executeQuery(importancyDataQuery);
    dataobj.empdata = empdata;
    dataobj.categorydata = categorydata;
    dataobj.urgencyData = urgencyData;
    dataobj.importancyData = importancyData;
    response.json(dataobj);  
  } catch (err) {
      logger.error(err);
  }
}

const inserttaskdata = async(request,response) =>{
  try {
      taskdata = request.body;
      console.log(taskdata);
      let lastInserted_id;
      let db=new database();
      let prioritiy_id = 0;
      if(taskdata.impotant_level == 1 && taskdata.urgency_level == 1)
      {
        prioritiy_id = 1
      }
      else if(taskdata.impotant_level == 1 && taskdata.urgency_level == 2)
      {
        prioritiy_id = 2
      }
      else if(taskdata.impotant_level == 1 && taskdata.urgency_level == 3)
      {
        prioritiy_id = 3
      }
      else if(taskdata.impotant_level == 2 && taskdata.urgency_level == 1)
      {
        prioritiy_id = 4
      }
      else if(taskdata.impotant_level == 2 && taskdata.urgency_level == 2)
      {
        prioritiy_id = 5
      }
      else if(taskdata.impotant_level == 2 && taskdata.urgency_level == 3)
      {
        prioritiy_id = 6
      }
      else if(taskdata.impotant_level == 3 && taskdata.urgency_level == 1)
      {
        prioritiy_id = 7
      }
      else if(taskdata.impotant_level === 3 && taskdata.urgency_level === 2)
      {
        prioritiy_id = 8
      }
      else if(taskdata.impotant_level == 3 && taskdata.urgency_level == 3)
      {
        prioritiy_id = 9
      }
      let res=await db.insertData({manager_id:1,category_id:taskdata.task_category, prioritiy_id:prioritiy_id,task_name:taskdata.task_name,task_description:taskdata.task_description ,task_start_date : taskdata.task_start_date,task_end_date:taskdata.task_end_date,
      task_status:taskdata.task_status,},"tasks");
      lastInserted_id = res.insertId;
      await taskdata.emp_id.forEach(element => {
        let team = db.insertData({task_id:lastInserted_id, emp_id:element},"tasks_assigend_to")
      });
      response.json({msg:done});

  } catch (error) {
    logger.error(error);
  }
}

module.exports={addtaskdata ,inserttaskdata }