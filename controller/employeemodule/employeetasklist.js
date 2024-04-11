// const UserTaskList= (req, res) => {
//     res.render('UserTaskList')
// }

const database = require("../../helpers/database.helper")

// module.exports={UserTaskList}

const list= async (req,res)=>{
    res.render('employeemodule/employeetasklist')

}

const EmployeeTaskList = async (req, res) => {
    try {
        id = req.params.id
        const query = `select * from tasks_assigend_to as a inner join tasks as t on t.id=a.task_id;`
        let db = new database()
        let result = await db.executeQuery(query)
        res.json(result)
    }
    catch (error) {
        console.log(error)
    }
}

const gettasks = async (req, res) => {
    try{
    id = req.params.id
    const query = `select * from tasks where manager_id=3 and task_status='todo' and id=${id};`
    let db = new database()
    let result = await db.executeQuery(query)
    res.json(result)
    }
    catch(error){
        console.log(error)
    }

}
module.exports = { EmployeeTaskList, gettasks, list }