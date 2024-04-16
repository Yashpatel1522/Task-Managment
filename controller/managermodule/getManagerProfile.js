const database = require("../../helpers/database.helper");
const logger = require("../../logger/logger")

const managerProfile = async (request,response) => {
    try{
        let q = `select * from users where id = 8 and status = 1;`;
        let db=new database();
        let res=await db.executeQuery(q); 
        return response.json({result:res})
    }
    catch(error){
        logger.log(error);
        return response.send({'error': error})
    }

}

module.exports = managerProfile;