const logger = require("../../logger/logger")

exports.messsageGet=(request,response)=>{
  try{
    response.render("managermodule/message.ejs")
  }
  catch(err)
  {
    logger.log(err)
  }
}