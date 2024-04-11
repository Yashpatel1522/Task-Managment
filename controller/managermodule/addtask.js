const database = require("../../helpers/database.helper");
const logger = require("../../logger/logger");




exports.addtaskdata = async(request,response) => {
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