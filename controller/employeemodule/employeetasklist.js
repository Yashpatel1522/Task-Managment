// const UserTaskList= (req, res) => {
//     res.render('UserTaskList')
// }

const database = require("../../helpers/database.helper")

// module.exports={UserTaskList}

const list = async (req, res) => {
    res.render('employeemodule/employeetasklist')

}

const EmployeeTaskList = async (req, res) => {
    try {
        id = req.params.id
        console.log(id, "id is===")
        const query = `select * from tasks_assigend_to as a inner join tasks as t on t.id=a.task_id inner join categories as c on c.id=t.category_id where a.emp_id=?;`
        let db = new database()
        let result = await db.executeQuery(query, id)
        res.json(result)
    }
    catch (error) {
        console.log(error)
    }
}

const searchlist = async (req, res) => {
    try {
        usersearch = req.body.search
        console.log(usersearch, "fsdfsdfsdfsdf")
        const query = `select * from tasks as t inner join tasks_assigend_to as a on a.task_id = t.id where t.task_name like ? or t.task_end_date like ?`
        let db = new database()
        let result = await db.executeQuery(query, ['%' + usersearch + '%', '%' + usersearch + '%'])
        console.log(result, "result data ")
        res.json(result)

    }
    catch (error) {
        console.log(error)
    }
}

module.exports = { EmployeeTaskList, list, searchlist }