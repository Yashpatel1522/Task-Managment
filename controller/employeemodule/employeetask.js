const { compareSync } = require("bcrypt")
const database = require("../../helpers/database.helper")
const logger = require("../../logger/logger");
const db = new database();

const list = async (req, res) => {
    res.render('employeemodule/employeetasklist')

}

const EmployeeTaskList = async (req, res) => {
    try {
        id = req.params.id
        const query = `select t.id as task_id,t.task_name,t.task_description,t.task_start_date,t.task_end_date,t.task_status,urgency.id as urgency_id,urgency.type as urgencytype,imp.type as importancetype,c.category,u.first_name from tasks_assigend_to as a inner join tasks as t on t.id=a.task_id 
        inner join categories as c on c.id=t.category_id 
        inner join users as u on u.role_id=t.manager_id 
        inner join priorities as p on p.id=t.prioritiy_id 
        inner join urgency on urgency.id=p.urgency_id
        inner join importants as imp on imp.id=p.important_id  where a.emp_id=? order by p.urgency_id;`
        let result = await db.executeQuery(query, id)
        res.json(result)
    }
    catch (error) {
        logger.error("Employee Task data is not found !");
    }
}

const searchlist = async (req, res) => {
    try {
        usersearch = req.body.search
        const query = `select * from tasks as t inner join tasks_assigend_to as a on a.task_id=t.id inner join priorities as p on p.id=t.prioritiy_id  inner join urgency on urgency.id=p.urgency_id where t.task_name like ? or t.task_end_date like ?;`
        let result = await db.executeQuery(query, ['%' + usersearch + '%', '%' + usersearch + '%'])
        res.json(result)

    }
    catch (error) {
        logger.error("Employee Task search data is not found !");
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
        let result = await db.insertData(addcomment, "user_comments")
        let userprofiledata = {
            "task_id": req.params.taskid,
            "oldfile_name": file.originalname,
            "newfile_name": file.filename,
        }
        resultprofile = await db.insertData(userprofiledata, "user_profiles")
        res.status(200).json({ 'data': resultprofile, 'msg': 'done' })
    }
    catch (error) {
        logger.error("Employee Task comments is not inserted");
    }
}

module.exports = { EmployeeTaskList, list, searchlist, addcomment }