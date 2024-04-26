const { compareSync } = require("bcrypt")
const database = require("../../helpers/database.helper")
const logger = require("../../logger/logger");
const db = new database();

const list = async (req, res) => {
    res.render('employeemodule/employeetasklist')

}

const EmployeeTaskList = async (req, res) => {
    try {
        // id = req.params.id
        id = 4
        const query = `select t.id as task_id,t.task_name,t.task_description,t.task_start_date,t.task_end_date,t.task_status,urgency.id as urgency_id,urgency.type as urgencytype,imp.type as importancetype,c.category,u.first_name from tasks_assigend_to as a inner join tasks as t on t.id=a.task_id 
        inner join categories as c on c.id=t.category_id 
        inner join users as u on u.id=t.manager_id 
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
        usersearch = req.params.searchresult
        const query = `select * from tasks as t inner join tasks_assigend_to as a on a.task_id=t.id inner join priorities as p on p.id=t.prioritiy_id  inner join urgency on urgency.id=p.urgency_id where t.task_name like ? or t.task_end_date like ? or t.task_description like ?;`
        let result = await db.executeQuery(query, ['%' + usersearch + '%', '%' + usersearch + '%', '%' + usersearch + '%'])
        res.json(result)

    }
    catch (error) {
        logger.error("Employee Task search data is not found !");
    }
}

const addcomment = async (req, res) => {
    let file = req.file
    try {
        const date = new Date()
        const year  = date.getFullYear()
        const month  = date.getMonth()
        const day  = date.getDate()
        const hour  = date.getHours()
        const minute  = date.getMinutes()
        const seconds = date.getSeconds()
        console.log(month);
        if(req.body.taskstatus == "inprogress"){
            
            let addcomment = {
                employee_id: req.params.id,
                task_id: req.params.taskid,
                task_status: req.body.taskstatus,
                comment: req.body.taskcomment,
                attechment: file.filename,
                oldfile_name: file.originalname,
                started_at: `${year}-${month+1}-${day} ' ' ${hour}:${minute}:${seconds}`
            }
            let result = await db.insertData(addcomment, "user_comments")
        }
        else if(req.body.taskstatus == "completed"){
            console.log('b',req.params.id,req.params.taskid,req.body.taskstatus,req.body.taskcomment,file);
            let addcomment = {
                task_status: req.body.taskstatus,
                comment: req.body.taskcomment,
                attechment: file.filename,
                oldfile_name: file.originalname,
                finished_at: `${year}-${month+1}-${day} ' ' ${hour}:${minute}:${seconds}`
            }
            console.log('up');
            let result = await db.updateAnd(addcomment, "user_comments",{employee_id:req.params.id,task_id:req.params.taskid})
        }
        res.status(200).json({ 'data': resultprofile, 'msg': 'done' })
    }
    catch (error) {
        logger.error("Employee Task comments is not inserted");
    }
}

module.exports = { EmployeeTaskList, list, searchlist, addcomment }