const logger = require("../../logger/logger")

exports.messsageGet=(request,response)=>{
  try{
    response.render("managermodule/message")
  }
  catch(err)
  {
    logger.log(err)
  }
}