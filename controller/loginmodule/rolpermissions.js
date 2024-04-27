const database = require("../../helpers/database.helper");
const logger = require("../../logger/logger");
let db=new database()
const rolePermissionsGet = (request, response) => {
  try {
    response.render("loginmodule/rolepermissions");
  } catch (err) {
    logger.log(err);
  }
};

const allPermissionsGet=async(request,response)=>{
  try{
  response.send(await db.executeQuery("select * from permissions"));
  }
  catch(err){
    logger.log(err)
  }
}

module.exports={rolePermissionsGet,allPermissionsGet}