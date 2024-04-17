const database = require("../../helpers/database.helper");
const logger = require("../../logger/logger")

const updateManager = async (request,response) => {
    try{
        const data = request.body;
        let db=new database();
        
        const countQuery = `select count(*) as count from user_profiles where user_id = ?`;
        const countRes=await db.executeQuery(countQuery, [8]);
        
        if(countRes[0].count == 0) {
            const oldName = request.file.filename.slice(request.file.filename.indexOf('-')+1);
            const updateImageQuery = `insert into user_profiles (user_id, oldimage_name, newimage_name) values (?, ?, ?)`;
            console.log(oldName);
            console.log(request.file.filename);
            const updatedRes=await db.executeQuery(updateImageQuery, [8, oldName, request.file.filename]);
        }
        else {
            const oldName = request.file.filename.slice(request.file.filename.indexOf('-')+1);
            const updateImageQuery = `update user_profiles set oldimage_name = ?, newimage_name = ? where user_id = ?`;
            const updatedRes=await db.executeQuery(updateImageQuery, [oldName, request.file.filename, 8]);
        }

        return response.send(data)
    }
    catch(error){
        logger.error(error);
        return response.send({'error': error})
    }

}

module.exports = updateManager;