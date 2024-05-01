const { compareSync } = require("bcrypt");
const database = require("../../helpers/database.helper");
const logger = require("../../logger/logger");
const db = new database();

const list = async (request, response) => {
    try {
        response.render("employeemodule/employeetasklist");
    } catch (err) {
        logger.error("Employee Task data is not found !");
    }
};

const employeeTaskList = async (request, response) => {
    try {
        id = request.user.id;
        const query = `select t.id as task_id,t.task_name,t.task_description,t.task_start_date,t.task_end_date,t.task_status,urgency.id as urgency_id,urgency.type as urgencytype,imp.type as importancetype,c.category,u.first_name from tasks_assigend_to as a inner join tasks as t on t.id=a.task_id 
        inner join categories as c on c.id=t.category_id 
        inner join users as u on u.id=t.manager_id 
        inner join priorities as p on p.id=t.prioritiy_id 
        inner join urgency on urgency.id=p.urgency_id
        inner join importants as imp on imp.id=p.important_id  where a.emp_id=? and t.status=? order by p.urgency_id;`;
    let result = await db.executeQuery(query, [id, 1]);
    response.json(result);
  } catch (error) {
    logger.error("Employee Task data is not found !");
  }
};

const searchList = async (req, res) => {
  try {
    usersearch = req.params.searchresult
    const query = `select a.task_id,t.task_name,t.task_description,t.task_status,c.category from tasks as t inner join tasks_assigend_to as a on a.task_id=t.id inner join categories as c on c.id=t.category_id inner join priorities as p on p.id=t.prioritiy_id inner join urgency on urgency.id=p.urgency_id where (t.task_name like ? or c.category like ?) and t.status=? and a.emp_id = ?`
    let result = await db.executeQuery(query, ['%' + usersearch + '%', '%' + usersearch + '%', 1, req.user.id]);
    res.json(result);

  }
  catch (error) {
    logger.error("Employee Task search data is not found !");
  }
};

const addComment = async (request, response) => {
    let file = request.file
    const id = request.user.id;
    try {
        let addcomment = {
            employee_id: id,
            task_id: request.params.taskid,
            task_status: request.body.taskstatus,
            comment: request.body.taskcomment,
            attechment: file.filename,
            oldfile_name: file.originalname
        }
        let result = await db.insertData(addcomment, "user_comments")

        const date = new Date()
        const year = date.getFullYear()
        const month = date.getMonth()
        const day = date.getDate()
        const hour = date.getHours()
        const minute = date.getMinutes()
        const seconds = date.getSeconds()
        if (request.body.taskstatus == "inprogress") {

            let reports = {
                started_at: `${year}-${month + 1}-${day} ' ' ${hour}:${minute}:${seconds}`
            }
            let result = await db.updateAnd(reports, "tasks_assigend_to", { emp_id: id, task_id: request.params.taskid })
        }

        else if (request.body.taskstatus == "completed") {
            let reports = {
                finished_at: `${year}-${month + 1}-${day} ' ' ${hour}:${minute}:${seconds}`
            }
            let result = await db.updateAnd(reports, "tasks_assigend_to", { emp_id: id, task_id: request.params.taskid })
        }
        response.status(200).json({ 'msg': 'added' })
    }
    catch (error) {
        logger.error("Employee Task comments is not inserted");
    }

}


const notifications = async (request, response) => {
    try {
        let id = request.user.id;
        console.log(id, "{}{}")
        let notificationQuery = `SELECT task_name , DATE_FORMAT(tasks.task_end_date, '%Y-%m-%d') as due_date
        FROM tasks inner join tasks_assigend_to on tasks.id=tasks_assigend_to.task_id inner join users on users.id=tasks_assigend_to.emp_id
        WHERE tasks.task_end_date = CURDATE() and tasks_assigend_to.emp_id=?;`;
        let res = await db.executeQuery(notificationQuery, id);
        return response.json(res);
    } catch (error) {
        logger.error(error);
    }
};

module.exports = { employeeTaskList, list, searchList, addComment, notifications };
