const taskView = () => {
    return { 
        getPage (request,response){
            try{
                response.render('../views/managermodule/managerdashboard')
            }
            catch(error){
                logger.log(error);
                response.send({'error': error})
            }
        }  
    }
}

module.exports = taskView;