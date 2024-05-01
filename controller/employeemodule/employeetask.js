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
    id = 5;
    const query = `select t.id as task_id,t.task_name,t.task_description,t.task_start_date,t.task_end_date,t.task_status,urgency.id as urgency_id,urgency.type as urgencytype,imp.type as importancetype,c.category,u.first_name from tasks_assigend_to as a inner join tasks as t on t.id=a.task_id 
        inner join categories as c on c.id=t.category_id 
        inner join users as u on u.id=t.manager_id 
        inner join priorities as p on p.id=t.prioritiy_id 
        inner join urgency on urgency.id=p.urgency_id
        inner join importants as imp on imp.id=p.important_id  where a.emp_id=? and t.status=1 order by p.urgency_id;`;
    let result = await db.executeQuery(query, id);
    response.json(result);
  } catch (error) {
    logger.error("Employee Task data is not found !");
  }
};

const searchList = async (req, res) => {
  try {
    usersearch = req.params.searchresult
    const query = `select * from tasks as t inner join tasks_assigend_to as a on a.task_id=t.id inner join categories as c on c.id=t.category_id inner join priorities as p on p.id=t.prioritiy_id inner join urgency on urgency.id=p.urgency_id where (t.task_name like ? or c.category like ?) and t.status=? and a.emp_id = ?`
    let result = await db.executeQuery(query, ['%' + usersearch + '%', '%' + usersearch + '%',1, req.user.id]);
    res.json(result);

  }
  catch (error) {
    logger.error("Employee Task search data is not found !");
  }
};

const addComment = async (req, res) => {
  let file = req.file;
  const id = req.user.id;
  try {
    let addcomment = {
      employee_id: id,
      task_id: req.params.taskid,
      task_status: req.body.taskstatus,
      comment: req.body.taskcomment,
      attechment: file.filename,
      oldfile_name: file.originalname,
    };
    let result = await db.insertData(addcomment, "user_comments");

    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const seconds = date.getSeconds();
    if (req.body.taskstatus == "inprogress") {
      let reports = {
        user_id: id,
        task_id: req.params.taskid,
        startat_at: `${year}-${month + 1
          }-${day} ' ' ${hour}:${minute}:${seconds}`,
      };
      let result = await db.insertData(reports, "reports");
    } else if (req.body.taskstatus == "completed") {
      let reports = {
        finished_at: `${year}-${month + 1
          }-${day} ' ' ${hour}:${minute}:${seconds}`,
      };
      let result = await db.updateAnd(reports, "reports", {
        user_id: id,
        task_id: req.params.taskid,
      });
    }
    // let userfileedata = {
    //     "task_id": req.params.taskid,
    //     "attechment_url": file.filename,
    // }
    // resultprofile = await db.insertData(userfileedata, "attechments")
    res.status(200).json({ msg: "added" });
  } catch (error) {
    logger.error("Employee Task comments is not inserted");
  }
};

module.exports = { employeeTaskList, list, searchList, addComment };
