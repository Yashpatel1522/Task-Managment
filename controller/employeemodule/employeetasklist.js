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
        const query = `select * from tasks_assigend_to as a inner join tasks as t on t.id=a.task_id inner join categories as c on c.id=t.category_id inner join users as u on u.role_id=t.manager_id inner join priorities as p on p.id=t.prioritiy_id inner join urgency on urgency.id=p.urgency_id inner join importants as imp on imp.id=p.important_id  where a.emp_id=1 order by p.urgency_id;`
        let db = new database()
        let result = await db.executeQuery(query, id)
        console.log(result, "imporratancy  ")
        res.json(result)
    }
    catch (error) {
        console.log(error)
    }
}

const searchlist = async (req, res) => {
    try {
        usersearch = req.body.search
        const query = `select * from tasks as t inner join tasks_assigend_to as a on a.task_id=t.id inner join priorities as p on p.id=t.prioritiy_id  inner join urgency on urgency.id=p.urgency_id where t.task_name like ? or t.task_end_date like ?;`
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
    let file = req.file
    try {
        let addcomment = {
            employee_id: req.params.id,
            task_id: req.params.taskid,
            task_status: req.body.taskstatus,
            comment: req.body.taskcomment,
            attechment: file.filename

        }
        let db = new database()
        let result = await db.insertData(addcomment, "user_comments")
        let userprofiledata = {
            "task_id": req.params.taskid,
            "oldfile_name": file.originalname,
            "newfile_name": file.filename,
        }
        resultprofile = await db.insertData(userprofiledata, "user_profiles")
        res.status(200).json({ 'data': resultprofile,'msg':'done'})
    }
    catch (error) {
        console.log(error)
    }
}

module.exports = { EmployeeTaskList, list, searchlist, addcomment }