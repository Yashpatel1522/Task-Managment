// const UserTaskList= (req, res) => {
//     res.render('UserTaskList')
// }

const { compareSync } = require("bcrypt")
const database = require("../../helpers/database.helper")

// module.exports={UserTaskList}

const list = async (req, res) => {
    res.render('employeemodule/employeetasklist')

}

const EmployeeTaskList = async (req, res) => {
    try {
        id = req.params.id
        console.log(id, "id is===")
        const query = `select * from tasks_assigend_to as a inner join tasks as t on t.id=a.task_id inner join categories as c on c.id=t.category_id inner join users as u on u.role_id=t.manager_id where a.emp_id=?;`
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

const addcomment = async (req, res) => {

    console.log(req.body,"----------",req.params.id,"-----------------",req.query.gtask)
    // try {
    //     let addcomment = {
    //         task_status: req.body.taskstatus,
    //         comment: req.body.taskcomment,
    //         employee_id: req.params.id
    //     }
    //     let db = new database()
    //     let res = await db.insertData(addcomment, "user_comments")
    //     console.log(request.file)
    //     let file = request.file
    //     let userprofiledata = {
    //         "user_id": res.insertId,
    //         "oldimage_name": file.originalname,
    //         "newimage_name": file.filename,
    //         "path": file.path
    //     }
    //     res = await db.insertData(userprofiledata, "user_profiles")
    //     console.log(res)
    // }
    // catch (error) {
    //     console.log(error)
    // }
}

module.exports = { EmployeeTaskList, list, searchlist, addcomment }